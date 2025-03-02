import express from "express";
import BookRoutes from "./BookRoutes.js";
import OrderRoutes from "./OrderRoutes.js";
import AuthRoutes from "./AuthRoutes.js";
import { getStats } from "../controllers/StatsController.js";

const router = express.Router();

router.use("/books", BookRoutes);
router.use("/orders", OrderRoutes);
router.use("/auth", AuthRoutes);
router.get("/admin/stats", getStats);

export default router;
