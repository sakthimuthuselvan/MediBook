// src/config/db.ts
import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  try {
    const connect_url = process.env.CONNECTION_URL;

    if (!connect_url) {
      throw new Error("⚠️ CONNECTION_URL is not defined in environment variables");
    }

    await mongoose.connect(connect_url);
    console.log("✅ MongoDB connected successfully!");
  } catch (error) {
    console.error("❌ Error connecting to MongoDB with Mongoose:", error);
    process.exit(1); // Exit process if DB connection fails
  }
};

export default connectDB;
