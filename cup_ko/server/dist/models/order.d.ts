import mongoose from "mongoose";
declare const Order: mongoose.Model<{
    customerName: string;
    date: NativeDate;
    items: mongoose.Types.DocumentArray<{
        id: number;
        name: string;
        price: number;
        image: string;
        quantity: number;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
        id: number;
        name: string;
        price: number;
        image: string;
        quantity: number;
    }, {}, {}> & {
        id: number;
        name: string;
        price: number;
        image: string;
        quantity: number;
    }>;
    totalPrice: number;
    modePayment: "cash" | "gcash";
    modeBuying: "reservation" | "physical" | "delivery";
    status: "pending" | "paid" | "completed";
    gcashRefNo?: string | null;
    pickupTime?: NativeDate | null;
    customerUsername?: string | null;
    location?: string | null;
}, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    customerName: string;
    date: NativeDate;
    items: mongoose.Types.DocumentArray<{
        id: number;
        name: string;
        price: number;
        image: string;
        quantity: number;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
        id: number;
        name: string;
        price: number;
        image: string;
        quantity: number;
    }, {}, {}> & {
        id: number;
        name: string;
        price: number;
        image: string;
        quantity: number;
    }>;
    totalPrice: number;
    modePayment: "cash" | "gcash";
    modeBuying: "reservation" | "physical" | "delivery";
    status: "pending" | "paid" | "completed";
    gcashRefNo?: string | null;
    pickupTime?: NativeDate | null;
    customerUsername?: string | null;
    location?: string | null;
}, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<{
    customerName: string;
    date: NativeDate;
    items: mongoose.Types.DocumentArray<{
        id: number;
        name: string;
        price: number;
        image: string;
        quantity: number;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
        id: number;
        name: string;
        price: number;
        image: string;
        quantity: number;
    }, {}, {}> & {
        id: number;
        name: string;
        price: number;
        image: string;
        quantity: number;
    }>;
    totalPrice: number;
    modePayment: "cash" | "gcash";
    modeBuying: "reservation" | "physical" | "delivery";
    status: "pending" | "paid" | "completed";
    gcashRefNo?: string | null;
    pickupTime?: NativeDate | null;
    customerUsername?: string | null;
    location?: string | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    customerName: string;
    date: NativeDate;
    items: mongoose.Types.DocumentArray<{
        id: number;
        name: string;
        price: number;
        image: string;
        quantity: number;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
        id: number;
        name: string;
        price: number;
        image: string;
        quantity: number;
    }, {}, {}> & {
        id: number;
        name: string;
        price: number;
        image: string;
        quantity: number;
    }>;
    totalPrice: number;
    modePayment: "cash" | "gcash";
    modeBuying: "reservation" | "physical" | "delivery";
    status: "pending" | "paid" | "completed";
    gcashRefNo?: string | null;
    pickupTime?: NativeDate | null;
    customerUsername?: string | null;
    location?: string | null;
}, mongoose.Document<unknown, {}, {
    customerName: string;
    date: NativeDate;
    items: mongoose.Types.DocumentArray<{
        id: number;
        name: string;
        price: number;
        image: string;
        quantity: number;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
        id: number;
        name: string;
        price: number;
        image: string;
        quantity: number;
    }, {}, {}> & {
        id: number;
        name: string;
        price: number;
        image: string;
        quantity: number;
    }>;
    totalPrice: number;
    modePayment: "cash" | "gcash";
    modeBuying: "reservation" | "physical" | "delivery";
    status: "pending" | "paid" | "completed";
    gcashRefNo?: string | null;
    pickupTime?: NativeDate | null;
    customerUsername?: string | null;
    location?: string | null;
}, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<{
    customerName: string;
    date: NativeDate;
    items: mongoose.Types.DocumentArray<{
        id: number;
        name: string;
        price: number;
        image: string;
        quantity: number;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
        id: number;
        name: string;
        price: number;
        image: string;
        quantity: number;
    }, {}, {}> & {
        id: number;
        name: string;
        price: number;
        image: string;
        quantity: number;
    }>;
    totalPrice: number;
    modePayment: "cash" | "gcash";
    modeBuying: "reservation" | "physical" | "delivery";
    status: "pending" | "paid" | "completed";
    gcashRefNo?: string | null;
    pickupTime?: NativeDate | null;
    customerUsername?: string | null;
    location?: string | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, unknown, {
    customerName: string;
    date: NativeDate;
    items: mongoose.Types.DocumentArray<{
        id: number;
        name: string;
        price: number;
        image: string;
        quantity: number;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
        id: number;
        name: string;
        price: number;
        image: string;
        quantity: number;
    }, {}, {}> & {
        id: number;
        name: string;
        price: number;
        image: string;
        quantity: number;
    }>;
    totalPrice: number;
    modePayment: "cash" | "gcash";
    modeBuying: "reservation" | "physical" | "delivery";
    status: "pending" | "paid" | "completed";
    gcashRefNo?: string | null;
    pickupTime?: NativeDate | null;
    customerUsername?: string | null;
    location?: string | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    customerName: string;
    date: NativeDate;
    items: mongoose.Types.DocumentArray<{
        id: number;
        name: string;
        price: number;
        image: string;
        quantity: number;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
        id: number;
        name: string;
        price: number;
        image: string;
        quantity: number;
    }, {}, {}> & {
        id: number;
        name: string;
        price: number;
        image: string;
        quantity: number;
    }>;
    totalPrice: number;
    modePayment: "cash" | "gcash";
    modeBuying: "reservation" | "physical" | "delivery";
    status: "pending" | "paid" | "completed";
    gcashRefNo?: string | null;
    pickupTime?: NativeDate | null;
    customerUsername?: string | null;
    location?: string | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export default Order;
//# sourceMappingURL=order.d.ts.map