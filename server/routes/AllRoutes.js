import express from "express";
import BookRoutes from "./BookRoutes.js";
import OrderRoutes from "./OrderRoutes.js";

const router = express.Router();

router.use("/books", BookRoutes);
router.use("/orders", OrderRoutes);

export default router;
