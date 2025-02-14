import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";

const app = express();

dotenv.config();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(
  cors({
    origin: ["http://localhost:3000", "https://booknerd-client.vercel.app"],
    credentials: true,
    allowedHeaders: [
      "Origin",
      "X-Requested-With",
      "Content-Type",
      "Authorization",
      "Chache-Control",
      "Expires",
      "Last-Modified",
      "Pragma",
      "X-Custom-Header",
    ],
    methods: "GET, POST, PUT, DELETE",
  })
);

// Routes
app.get("/", (req, res) => {
  res.send("BookNerd server is running!");
});

const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => console.error(err));
