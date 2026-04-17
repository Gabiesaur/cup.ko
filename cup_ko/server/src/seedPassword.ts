import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import Settings from "./models/settings";

dotenv.config();

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
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB connected");

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const newPasswordEntry = new Settings({ adminPasswordHash: hashedPassword });
    await newPasswordEntry.save();

    console.log("✅ Password successfully hashed and saved to the database.");
    console.log("You can now securely use this password for the SalesTrackerPage.");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding password:", error);
    process.exit(1);
  }
};

seedPassword();
