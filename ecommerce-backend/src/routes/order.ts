import express from "express";
import { adminOnly } from "../middlewares/auth.js";
import {
  allOrders,
  createRazorpayOrder,
  deleteOrder,
  getSingleOrder,
  myOrders,
  newOrder,
  paymentVerificationAndOrderCreation,
  processOrder,
} from "../controllers/order.js";

const app = express.Router();

// route - /api/v1/order/new
app.post("/new", newOrder);

// route - /api/v1/order/newRazorpayOrder
app.post("/newRazorpayOrder", createRazorpayOrder);

//route - /api/v1/order/paymentVerifiedOrder
app.post("/paymentVerifiedOrder", paymentVerificationAndOrderCreation);

// route - /api/v1/order/my
app.get("/my", myOrders);

// route - /api/v1/order/all
app.get("/all", adminOnly, allOrders);

app
  .route("/:id")
  .get(getSingleOrder)
  .put(adminOnly, processOrder)
  .delete(adminOnly, deleteOrder);

export default app;
