import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import { app } from "./app";

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/bouquet_hamper_db";

async function bootstrap() {
  try {
    console.log("Connecting to MongoDB at:", MONGODB_URI);
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000
    });
    console.log("Successfully connected to MongoDB.");

    app.listen(PORT, () => {
      console.log(`Bloom & Blossom API running in ${process.env.NODE_ENV || "development"} mode on http://localhost:${PORT}`);
    });
  } catch (err: any) {
    console.warn("Could not connect to MongoDB:", err.message);
    console.log("Starting Express server in development/offline database fallback mode...");
    app.listen(PORT, () => {
      console.log(`Bloom & Blossom API running in fallback mode on http://localhost:${PORT}`);
    });
  }
}

bootstrap();
