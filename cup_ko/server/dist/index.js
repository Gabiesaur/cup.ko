"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const order_1 = __importDefault(require("./models/order"));
const settings_1 = __importDefault(require("./models/settings"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const express_session_1 = __importDefault(require("express-session"));
const connect_mongo_1 = __importDefault(require("connect-mongo"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "";
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";
// Middleware
app.use((0, cors_1.default)({
    origin: FRONTEND_URL,
    credentials: true,
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Trust proxy if we are behind a reverse proxy like Render
app.set("trust proxy", 1);
// Session Configuration
app.use((0, express_session_1.default)({
    secret: process.env.SESSION_SECRET || 'fallback-secret-key-change-in-prod',
    resave: false,
    saveUninitialized: false,
    store: connect_mongo_1.default.create({
        mongoUrl: MONGO_URI,
        collectionName: 'sessions'
    }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24, // 24 hours
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
    }
}));
// Auth Middleware
const requireAuth = (req, res, next) => {
    if (req.session && req.session.isAuthenticated) {
        next();
    }
    else {
        res.status(401).json({ error: "Unauthorized access" });
    }
};
// Health check route
app.get("/api/health", (req, res) => {
    res.json({ message: "Server is running" });
});
// MongoDB Connection
const connectDB = async () => {
    try {
        await mongoose_1.default.connect(MONGO_URI);
        console.log("✅ MongoDB connected");
    }
    catch (error) {
        console.error("❌ MongoDB connection failed:", error);
        process.exit(1);
    }
};
app.post("/saveOrder", async (req, res) => {
    try {
        const { modePayment, customerName, items, totalPrice, modeBuying, customerUsername, roomBuilding, pickupTime, } = req.body;
        const newOrder = new order_1.default({
            customerName,
            items,
            totalPrice,
            modePayment,
            modeBuying,
            date: new Date(),
        });
        if (modeBuying === "reservation") {
            newOrder.pickupTime = pickupTime ? new Date(pickupTime) : new Date();
            newOrder.customerUsername = customerUsername;
        }
        else if (modeBuying === "delivery") {
            newOrder.location = roomBuilding;
            newOrder.customerUsername = customerUsername;
        }
        await newOrder.save();
        res.status(201).json({ message: "order placed", orderId: newOrder._id });
    }
    catch (err) {
        console.error("Save order error:", err);
        const errorMessage = err instanceof Error ? err.message : "Unknown error";
        res.status(400).json({
            error: "order fail",
            details: errorMessage,
        });
    }
});
app.patch("/updateOrder/:id", requireAuth, async (req, res) => {
    try {
        const { gcashRefNo, status } = req.body;
        const updatePayload = {};
        if (typeof gcashRefNo === "string") {
            updatePayload.gcashRefNo = gcashRefNo;
        }
        if (typeof status === "string") {
            if (status !== "pending" && status !== "paid" && status !== "completed") {
                res.status(400).json({ error: "Invalid status" });
                return;
            }
            updatePayload.status = status;
        }
        if (Object.keys(updatePayload).length === 0) {
            res.status(400).json({ error: "No valid fields to update" });
            return;
        }
        const updated = await order_1.default.findByIdAndUpdate(req.params.id, updatePayload, { new: true });
        if (!updated) {
            res.status(404).json({ error: "Order not found" });
            return;
        }
        res.status(200).json({ message: "Order updated", order: updated });
    }
    catch (err) {
        console.error("Update order error:", err);
        const errorMessage = err instanceof Error ? err.message : "Unknown error";
        res.status(400).json({ error: "update fail", details: errorMessage });
    }
});
app.delete("/deleteOrder/:id", requireAuth, async (req, res) => {
    try {
        const deletedOrder = await order_1.default.findByIdAndDelete(req.params.id);
        if (!deletedOrder) {
            res.status(404).json({ error: "Order not found" });
            return;
        }
        res.status(200).json({ message: "Order deleted" });
    }
    catch (err) {
        console.error("Delete order error:", err);
        const errorMessage = err instanceof Error ? err.message : "Unknown error";
        res.status(400).json({ error: "delete fail", details: errorMessage });
    }
});
app.get("/getOrder/:id", requireAuth, async (req, res) => {
    try {
        const order = await order_1.default.findById(req.params.id);
        if (!order) {
            res.status(404).json({ error: "Order not found" });
            return;
        }
        res.status(200).json(order);
    }
    catch (err) {
        console.error("Fetch order error:", err);
        const errorMessage = err instanceof Error ? err.message : "Unknown error";
        res.status(400).json({ error: "fetch fail", details: errorMessage });
    }
});
app.get("/getOrders", requireAuth, async (_req, res) => {
    try {
        const orders = await order_1.default.find().sort({ date: -1 });
        res.status(200).json(orders);
    }
    catch (err) {
        console.error("Fetch orders error:", err);
        const errorMessage = err instanceof Error ? err.message : "Unknown error";
        res.status(400).json({ error: "fetch orders fail", details: errorMessage });
    }
});
app.post("/verifyPassword", async (req, res) => {
    try {
        const { password } = req.body;
        if (!password) {
            res.status(400).json({ error: "Password is required" });
            return;
        }
        const allSettings = await settings_1.default.find();
        // First time setup
        if (allSettings.length === 0) {
            const salt = await bcrypt_1.default.genSalt(10);
            const hashedPassword = await bcrypt_1.default.hash(password, salt);
            const newSettings = new settings_1.default({ adminPasswordHash: hashedPassword });
            await newSettings.save();
            res.status(200).json({ success: true, message: "Password set successfully" });
            return;
        }
        // Verify existing passwords
        let isMatch = false;
        for (const setting of allSettings) {
            if (await bcrypt_1.default.compare(password, setting.adminPasswordHash)) {
                isMatch = true;
                break;
            }
        }
        if (isMatch) {
            req.session.isAuthenticated = true;
            res.status(200).json({ success: true });
        }
        else {
            res.status(401).json({ error: "Invalid password" });
        }
    }
    catch (err) {
        console.error("Password verification error:", err);
        res.status(500).json({ error: "Server error" });
    }
});
app.get("/checkAuth", (req, res) => {
    if (req.session && req.session.isAuthenticated) {
        res.status(200).json({ isAuthenticated: true });
    }
    else {
        res.status(401).json({ isAuthenticated: false });
    }
});
app.post("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error("Logout error:", err);
            res.status(500).json({ error: "Failed to logout" });
        }
        else {
            res.clearCookie('connect.sid');
            res.status(200).json({ message: "Logged out successfully" });
        }
    });
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