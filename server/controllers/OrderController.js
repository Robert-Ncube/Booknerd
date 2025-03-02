import Book from "../models/BookModel.js";
import Order from "../models/OrderModel.js";
import mongoose from "mongoose";

export const createOrder = async (req, res) => {
  try {
    const order = req.body;
    console.log("Received Order:", order);

    // Check required fields (use ||)
    if (
      !order.username ||
      !order.userId ||
      !order.email ||
      !order.address ||
      !order.phone ||
      !order.books ||
      !Array.isArray(order.books) ||
      order.books.length === 0 ||
      order.totalPrice === undefined
    ) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields or no books in order!",
      });
    }

    // 1. CHECK BOOK AVAILABILITY & UPDATE STOCK FIRST
    for (const item of order.books) {
      const book = await Book.findById(item.bookId);
      if (!book) {
        return res.status(404).json({
          success: false,
          error: `Book ${item.bookId} not found`,
        });
      }
      if (book.stock < item.quantity) {
        return res.status(400).json({
          success: false,
          error: `Insufficient stock for ${book.title}`,
        });
      }
      // Deduct stock immediately
      book.stock -= item.quantity;
      await book.save();
    }

    // 2. CREATE THE ORDER AFTER STOCK UPDATE
    const newOrder = new Order(order);
    await newOrder.save();

    res.json({ success: true, data: newOrder });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Server error: Could not create order!",
      details: error.message,
    });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate({
        path: "books.bookId",
        select: "title category description newPrice coverImage stock", // Include needed fields
      })
      .sort({ createdAt: -1 }); // Newest first

    res.json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Server error: Could not fetch orders",
      details: error.message,
    });
  }
};

export const getOrdersByEmail = async (req, res) => {
  try {
    const { email } = req.query; // Get email from query params

    if (!email) {
      return res.status(400).json({
        success: false,
        error: "Email parameter is required",
      });
    }

    const orders = await Order.find({ email })
      .populate({
        path: "books.bookId",
        select: "title category description newPrice coverImage stock",
      })
      .sort({ createdAt: -1 });

    res.json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Server error: Could not fetch orders",
      details: error.message,
    });
  }
};

export const updatedOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { id: orderId } = req.params;

    console.log("Request Params:", req.params);
    console.log("Request Body:", req.body);

    if (!orderId || !status) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields: Order ID and Status!",
      });
    }

    const order = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        error: "Order not found!",
      });
    }

    res.json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Server error: Could not update order status",
      details: error.message,
    });
  }
};
