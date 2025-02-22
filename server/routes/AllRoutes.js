import express from "express";
import BookRoutes from "./BookRoutes.js";

const router = express.Router();

router.use("/books", BookRoutes);

export default router;
