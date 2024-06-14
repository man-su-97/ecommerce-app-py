import dotenv from "dotenv";
import express from "express";
import userRoutes from "./routes/user.route.js";
import connectDB from "./utils/feature.js";
import { errorMiddleware } from "./middlewares/error.js";
dotenv.config({ path: "./.env" });
const app = express();
connectDB();
app.use(express.json());
app.get("/", (req, res) => {
    res.send("API Working with /api/v1");
});
//using Routes
app.use("/api/v1/user", userRoutes);
app.use(errorMiddleware);
app.listen(process.env.PORT, () => {
    console.log(`Server running on http://localhost:${process.env.PORT}`);
});
