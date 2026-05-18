import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db";
import authRoutes from "./routes/authRoutes";
import leadRoutes from "./routes/leadRoutes";

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// REQUEST LOGGER (for debugging)
app.use((req, res, next) => {
  console.log("REQUEST:", req.method, req.url);
  next();
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/leads", leadRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("test457🚀");
});

// PORT
const PORT = process.env.PORT || 5000;

// Start Server
const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log("🍃 MongoDB Connected");
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
  }
};

startServer();