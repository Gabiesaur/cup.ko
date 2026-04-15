import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import Order from "./models/order.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "";
// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Health check route
app.get("/api/health", (req, res) => {
    res.json({ message: "Server is running" });
});
// MongoDB Connection
const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("✅ MongoDB connected");
    }
    catch (error) {
        console.error("❌ MongoDB connection failed:", error);
        process.exit(1);
    }
};
app.post("/saveOrder", async (req, res) => {
    try {
        const { modePayment, customerName, items, totalPrice, modeBuying, customerUsername, roomBuilding } = req.body;
        const newOrder = new Order({
            customerName,
            items,
            totalPrice,
            modePayment,
            modeBuying,
            date: new Date(),
        });
        if (modeBuying === "reservation") {
            newOrder.pickupTime = new Date();
            newOrder.customerUsername = customerUsername;
        }
        else if (modeBuying === "delivery") {
            newOrder.location = roomBuilding;
            newOrder.customerUsername = customerUsername;
        }
        await newOrder.save();
        res.status(201).json({ message: "order placed" });
    }
    catch (err) {
        console.error(err);
        res.status(400).json({
            error: "order fail",
        });
    }
});
// Start Server
const start = async () => {
    await connectDB();
    app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
};
start();
//# sourceMappingURL=index.js.map