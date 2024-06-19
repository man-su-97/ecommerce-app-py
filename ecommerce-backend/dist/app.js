import dotenv from "dotenv";
import express from "express";
import { connectDB } from "./utils/feature.js";
import { errorMiddleware } from "./middlewares/error.js";
import NodeCache from "node-cache";
dotenv.config({ path: "./.env" });
// Importing Routes
import userRoute from "./routes/user.js";
import productRoute from "./routes/product.js";
import orderRoute from "./routes/order.js";
import paymentRoute from "./routes/payments.js";
import Razorpay from "razorpay";
connectDB();
export const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID || "DEFAULT KEY ID",
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});
export const myCache = new NodeCache();
const app = express();
app.use(express.json());
app.get("/", (req, res) => {
    res.send("API Working with /api/v1");
});
//using Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/order", orderRoute);
app.use("/api/v1/payment", paymentRoute);
app.use("/uploads", express.static("uploads"));
app.use(errorMiddleware);
app.listen(process.env.PORT, () => {
    console.log(`Server running on http://localhost:${process.env.PORT}`);
});
