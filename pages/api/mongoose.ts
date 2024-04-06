// mongoose.ts

import mongoose from "mongoose";

const MONGODB_URI = "mongodb://localhost:27017/nse_v1";

export async function connectDB() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    throw error;
  }
}

export default mongoose;
