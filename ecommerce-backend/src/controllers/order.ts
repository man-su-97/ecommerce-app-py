import { Request } from "express";
import { TryCatch } from "../middlewares/error.js";
import { NewOrderRequestBody } from "../types/types.js";
import { Order } from "../models/order.js";
import { invalidateCache, reduceStock } from "../utils/feature.js";
import ErrorHandler from "../utils/utility-class.js";
import { myCache, razorpay } from "../app.js";
import logo from "../../../ecommerce-frontend/src/assets/py.png";

import crypto from "crypto";

export const myOrders = TryCatch(async (req, res, next) => {
  const { id: user } = req.query;

  const key = `my-orders-${user}`;

  let orders = [];

  if (myCache.has(key)) orders = JSON.parse(myCache.get(key) as string);
  else {
    orders = await Order.find({ user });
    myCache.set(key, JSON.stringify(orders));
  }
  return res.status(200).json({
    success: true,
    orders,
  });
});

export const allOrders = TryCatch(async (req, res, next) => {
  const key = `all-orders`;

  let orders = [];

  if (myCache.has(key)) orders = JSON.parse(myCache.get(key) as string);
  else {
    orders = await Order.find().populate("user", "name");
    myCache.set(key, JSON.stringify(orders));
  }
  return res.status(200).json({
    success: true,
    orders,
  });
});

export const getSingleOrder = TryCatch(async (req, res, next) => {
  const { id } = req.params;
  const key = `order-${id}`;

  let order;

  if (myCache.has(key)) order = JSON.parse(myCache.get(key) as string);
  else {
    order = await Order.findById(id).populate("user", "name");

    if (!order) return next(new ErrorHandler("Order Not Found", 404));

    myCache.set(key, JSON.stringify(order));
  }
  return res.status(200).json({
    success: true,
    order,
  });
});

export const newOrder = TryCatch(
  async (req: Request<{}, {}, NewOrderRequestBody>, res, next) => {
    const {
      shippingInfo,
      orderItems,
      user,
      subtotal,
      tax,
      shippingCharges,
      discount,
      total,
    } = req.body;

    if (!shippingInfo || !orderItems || !user || !subtotal || !tax || !total)
      return next(new ErrorHandler("Please Enter All Fields", 400));

    const order = await Order.create({
      shippingInfo,
      orderItems,
      user,
      subtotal,
      tax,
      shippingCharges,
      discount,
      total,
    });

    await reduceStock(orderItems);

    invalidateCache({
      product: true,
      order: true,
      admin: true,
      userId: user,
      productId: order.orderItems.map((i) => String(i.productId)),
    });

    // Generate Razorpay key
    const options = {
      amount: total * 100, // amount in paise
      currency: "INR",
      receipt: order._id.toString(), // unique receipt id for the transaction
      payment_capture: 1, // auto capture payment
    };

    try {
      const razorpayOrder = await razorpay.orders.create(options);
      res.status(201).json({
        success: true,
        message: "Order Placed Successfully",
        orderId: order._id,
        razorpayKey: process.env.RAZORPAY_KEY_ID, // Provide Razorpay key here
        razorpayOrderId: razorpayOrder.id, // Razorpay order ID
      });
    } catch (err) {
      console.error("Razorpay order creation error:", err);
      return next(new ErrorHandler("Razorpay order creation failed", 500));
    }
  }
);

export const createRazorpayOrder = TryCatch(async (req, res, next) => {
  const { amount } = req.body;

  if (!amount) return next(new ErrorHandler("Please enter amount", 400));

  const options = {
    amount: Number(amount) * 100,
    currency: "INR",
    receipt: `recipt_${Math.random().toString(36).substring(2, 15)}`,
    payment_capture: 1,
  };

  try {
    const razorpayOrder = await razorpay.orders.create(options);
    return res.status(201).json({
      success: true,
      razorpayOrderId: razorpayOrder.id,
      razorpayKey: process.env.RAZORPAY_KEY_ID,
    });
  } catch (err) {
    console.error("Razorpay order creation error:", err);
    return next(new ErrorHandler("Razorpay order creation failed", 500));
  }
});

export const paymentVerificationAndOrderCreation = TryCatch(
  async (req, res, next) => {
    const {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
      orderData,
    } = req.body;

    const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!);
    hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
    const generated_signature = hmac.digest("hex");

    if (generated_signature === razorpay_signature) {
      const {
        shippingInfo,
        orderItems,
        user,
        subtotal,
        tax,
        shippingCharges,
        discount,
        total,
      } = orderData;

      if (!shippingInfo || !orderItems || !user || !subtotal || !tax || !total)
        return next(new ErrorHandler("Please Enter All Fields", 400));

      const order = await Order.create({
        shippingInfo,
        orderItems,
        user,
        subtotal,
        tax,
        shippingCharges,
        discount,
        total,
        razorpay_order_id,
        razorpay_payment_id,
      });

      await reduceStock(orderItems);

      invalidateCache({
        product: true,
        order: true,
        admin: true,
        userId: user,
        productId: order.orderItems.map((i) => String(i.productId)),
      });

      return res.status(201).json({
        success: true,
        message: "Order Placed Successfully",
        orderId: order._id,
      });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Payment verification failed" });
    }
  }
);

export const processOrder = TryCatch(async (req, res, next) => {
  const { id } = req.params;

  const order = await Order.findById(id);

  if (!order) return next(new ErrorHandler("Order Not Found", 404));

  switch (order.status) {
    case "Processing":
      order.status = "Shipped";
      break;
    case "Shipped":
      order.status = "Delivered";
      break;
    default:
      order.status = "Delivered";
      break;
  }

  await order.save();

  invalidateCache({
    product: false,
    order: true,
    admin: true,
    userId: order.user,
    orderId: String(order._id),
  });

  return res.status(200).json({
    success: true,
    message: "Order Processed Successfully",
  });
});

export const deleteOrder = TryCatch(async (req, res, next) => {
  const { id } = req.params;

  const order = await Order.findById(id);
  if (!order) return next(new ErrorHandler("Order Not Found", 404));

  await order.deleteOne();

  invalidateCache({
    product: false,
    order: true,
    admin: true,
    userId: order.user,
    orderId: String(order._id),
  });

  return res.status(200).json({
    success: true,
    message: "Order Deleted Successfully",
  });
});
