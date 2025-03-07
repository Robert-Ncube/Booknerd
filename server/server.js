import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";

import AllRoutes from "./routes/AllRoutes.js";

const app = express();

dotenv.config();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(
  cors({
    origin: ["http://localhost:5173", "https://booknerdstore.vercel.app"],
    credentials: true,
    allowedHeaders: [
      "Origin",
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Pragma",
      "Expires",
    ],
    methods: "GET, POST, PUT, DELETE",
  })
);

// Routes
app.use("/api", AllRoutes);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => console.error(err));
