"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
const settings_1 = __importDefault(require("./models/settings"));
dotenv_1.default.config();
const MONGO_URI = process.env.MONGO_URI || "";
const seedPassword = async () => {
    const password = process.argv[2];
    if (!password) {
        console.error("❌ Please provide a password as an argument.");
        console.error("Usage: npm run seed-password <your_password>");
        process.exit(1);
    }
    if (!MONGO_URI) {
        console.error("❌ MONGO_URI is missing from .env file.");
        process.exit(1);
    }
    try {
        await mongoose_1.default.connect(MONGO_URI);
        console.log("✅ MongoDB connected");
        const salt = await bcrypt_1.default.genSalt(10);
        const hashedPassword = await bcrypt_1.default.hash(password, salt);
        const newPasswordEntry = new settings_1.default({ adminPasswordHash: hashedPassword });
        await newPasswordEntry.save();
        console.log("✅ Password successfully hashed and saved to the database.");
        console.log("You can now securely use this password for the SalesTrackerPage.");
        process.exit(0);
    }
    catch (error) {
        console.error("❌ Error seeding password:", error);
        process.exit(1);
    }
};
seedPassword();
//# sourceMappingURL=seedPassword.js.map