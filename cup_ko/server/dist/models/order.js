"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const orderSchema = new mongoose_1.default.Schema({
    customerName: { type: String, required: true },
    items: [
        {
            id: { type: Number, required: true },
            name: { type: String, required: true },
            price: { type: Number, required: true },
            image: { type: String, required: true },
            quantity: { type: Number, required: true },
        },
    ],
    totalPrice: { type: Number, required: true },
    modePayment: { type: String, enum: ["cash", "gcash"], required: true },
    modeBuying: {
        type: String,
        enum: ["reservation", "physical", "delivery"],
        required: true,
    },
    status: {
        type: String,
        enum: ["pending", "paid", "completed"],
        required: true,
        default: "pending",
    },
    gcashRefNo: { type: String },
    date: { type: Date, required: true },
    pickupTime: { type: Date },
    customerUsername: { type: String },
    location: { type: String },
});
const Order = mongoose_1.default.model("Order", orderSchema);
exports.default = Order;
// module.exports = Order;
//# sourceMappingURL=order.js.map