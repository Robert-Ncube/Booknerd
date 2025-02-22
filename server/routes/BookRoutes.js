import express from "express";
import {
  createBook,
  deleteBook,
  getAllBooks,
  getBookById,
  updateBook,
} from "../controllers/BookController.js";

const router = express.Router();

router.post("/create", createBook);
router.get("/all", getAllBooks);
router.get("/:id", getBookById);
router.put("/update/:id", updateBook);
router.delete("/delete/:id", deleteBook);

export default router;
