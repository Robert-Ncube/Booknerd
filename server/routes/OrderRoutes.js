import express from "express";
import {
  createOrder,
  getAllOrders,
  getOrdersByEmail,
} from "../controllers/OrderController.js";

const router = express.Router();

router.post("/create", createOrder);
router.get("/all", getAllOrders);
router.get("/user", getOrdersByEmail); // GET /api/orders/user?email=user@example.com

export default router;
