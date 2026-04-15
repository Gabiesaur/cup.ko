import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    customerName: { type: String, required: true },
    items: [{
        id: { type: Number, required: true },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
    }],
    totalPrice: { type: Number, required: true },
    modePayment: { type: String, enum: ["cash", "gcash"], required: true },
    modeBuying: { type: String, enum: ["reservation", "physical", "delivery"], required: true },
    status: { type: String, enum: ["pending", "paid", "done"], required: true, default: "pending" },
    date: { type: Date, required: true },
    pickupTime: { type: Date },
    customerUsername: { type: String },
    location: { type: String },
    gcashRefNo: { type: String },
});

const Order = mongoose.model('Order', orderSchema);
export default Order;
// module.exports = Order;