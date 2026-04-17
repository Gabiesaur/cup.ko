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
    const passwords = process.argv.slice(2);
    if (passwords.length === 0) {
        console.error("❌ Please provide at least one password as an argument.");
        console.error("Usage: npm run seed-password <pass1> <pass2> ...");
        process.exit(1);
    }
    if (!MONGO_URI) {
        console.error("❌ MONGO_URI is missing from .env file.");
        process.exit(1);
    }
    try {
        await mongoose_1.default.connect(MONGO_URI);
        console.log("✅ MongoDB connected");
        let settings = await settings_1.default.findOne();
        if (!settings) {
            settings = new settings_1.default();
        }
        // Hash all provided passwords
        const hashedPasswords = [];
        for (const pass of passwords) {
            const salt = await bcrypt_1.default.genSalt(10);
            hashedPasswords.push(await bcrypt_1.default.hash(pass, salt));
        }
        settings.adminPasswordHashes = hashedPasswords;
        await settings.save();
        console.log(`✅ Successfully hashed ${passwords.length} password(s) and replaced existing ones in the database.`);
        console.log("You can now securely use any of these passwords for the SalesTrackerPage.");
        process.exit(0);
    }
    catch (error) {
        console.error("❌ Error seeding passwords:", error);
        process.exit(1);
    }
};
seedPassword();
//# sourceMappingURL=seedPassword.js.map