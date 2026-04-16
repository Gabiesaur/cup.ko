import express, { Application, Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import Order from "./models/order";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "";

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check route
app.get("/api/health", (req: Request, res: Response) => {
  res.json({ message: "Server is running" });
});

// MongoDB Connection
const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    process.exit(1);
  }
};

app.post("/saveOrder", async (req: Request, res: Response) => {
  try {
    const {
      modePayment,
      customerName,
      items,
      totalPrice,
      modeBuying,
      customerUsername,
      roomBuilding,
      pickupTime,
    } = req.body;

    const newOrder = new Order({
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
    } else if (modeBuying === "delivery") {
      newOrder.location = roomBuilding;
      newOrder.customerUsername = customerUsername;
    }

    await newOrder.save();

    res.status(201).json({ message: "order placed", orderId: newOrder._id });
  } catch (err: unknown) {
    console.error("Save order error:", err);
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    res.status(400).json({
      error: "order fail",
      details: errorMessage,
    });
  }
});

app.patch("/updateOrder/:id", async (req: Request, res: Response) => {
  try {
    const { gcashRefNo, status } = req.body;
    const updatePayload: { gcashRefNo?: string; status?: string } = {};

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

    const updated = await Order.findByIdAndUpdate(
      req.params.id,
      updatePayload,
      { new: true },
    );
    if (!updated) {
      res.status(404).json({ error: "Order not found" });
      return;
    }
    res.status(200).json({ message: "Order updated", order: updated });
  } catch (err: unknown) {
    console.error("Update order error:", err);
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    res.status(400).json({ error: "update fail", details: errorMessage });
  }
});

app.delete("/deleteOrder/:id", async (req: Request, res: Response) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);

    if (!deletedOrder) {
      res.status(404).json({ error: "Order not found" });
      return;
    }

    res.status(200).json({ message: "Order deleted" });
  } catch (err: unknown) {
    console.error("Delete order error:", err);
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    res.status(400).json({ error: "delete fail", details: errorMessage });
  }
});

app.get("/getOrder/:id", async (req: Request, res: Response) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      res.status(404).json({ error: "Order not found" });
      return;
    }
    res.status(200).json(order);
  } catch (err: unknown) {
    console.error("Fetch order error:", err);
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    res.status(400).json({ error: "fetch fail", details: errorMessage });
  }
});

app.get("/getOrders", async (_req: Request, res: Response) => {
  try {
    const orders = await Order.find().sort({ date: -1 });
    res.status(200).json(orders);
  } catch (err: unknown) {
    console.error("Fetch orders error:", err);
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    res.status(400).json({ error: "fetch orders fail", details: errorMessage });
  }
});

// Start Server
const start = async (): Promise<void> => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
};

start();
