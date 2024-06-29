import dotenv from "dotenv";
import express from "express";
import { connectDB, connectRedis } from "./utils/feature.js";
import { errorMiddleware } from "./middlewares/error.js";
import NodeCache from "node-cache";
import morgan from "morgan";
import cors from "cors";

dotenv.config({ path: "./.env" });

const redisURI = process.env.REDIS_URI || "";

export const redisTTL = process.env.REDIS_TTL || 60 * 60 * 4;

// Importing Routes

import userRoute from "./routes/user.js";
import productRoute from "./routes/product.js";
import orderRoute from "./routes/order.js";
import paymentRoute from "./routes/payments.js";
import dashboardRoute from "./routes/stats.js";
import Razorpay from "razorpay";
import { v2 as cloudinary } from "cloudinary";

connectDB();
export const redis = connectRedis(redisURI);

export const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "DEFAULT KEY ID",
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});
export const myCache = new NodeCache();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("API Working with /api/v1");
});

//using Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/order", orderRoute);
app.use("/api/v1/payment", paymentRoute);
app.use("/api/v1/dashboard", dashboardRoute);

app.use("/uploads", express.static("uploads"));
app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});
