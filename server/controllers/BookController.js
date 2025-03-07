import Book from "../models/BookModel.js";

export const createBook = async (req, res) => {
  try {
    const book = req.body;
    //console.log("Book:", book);

    // Check required fields (use ||)
    if (
      !book.title ||
      !book.description ||
      !book.category ||
      !book.coverImage ||
      !book.stock ||
      !book.newPrice
    ) {
      return res
        .status(400)
        .json({ success: false, error: "Missing required fields!" });
    }

    // Validate prices if provided
    if (book.newPrice !== undefined && book.newPrice <= 0) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid price range!" });
    }

    // Validate stock
    if (book.stock < 0) {
      return res.status(400).json({ success: false, error: "Invalid stock!" });
    }

    // Check existing book
    const existingBook = await Book.findOne({ title: book.title });
    if (existingBook) {
      return res
        .status(400)
        .json({ success: false, error: "Book already exists!" });
    }

    // Create new book
    const newBook = new Book(book);
    await newBook.save();

    res.status(200).json({ success: true, data: newBook });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Server error: Could not create book.",
      details: error.message,
    });
  }
};

export const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: books });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Server error: Could not get books.",
      details: error.message,
    });
  }
};

export const getBookById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res
        .status(400)
        .json({ success: false, error: "Missing params: Book ID!" });
    }

    const book = await Book.findById(id);

    if (!book) {
      return res.status(404).json({ success: false, error: "Book not found!" });
    }

    res.json({ success: true, data: book });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Server error: Could not get books.",
      details: error.message,
    });
  }
};

export const updateBook = async (req, res) => {
  try {
    // Validate request body
    if (!req.body) {
      return res
        .status(400)
        .json({ success: false, error: "No data provided!" });
    }

    const book = await Book.findByIdAndUpdate(
      req.params.id,
      req.body, // Use request body directly
      { new: true, runValidators: true }
    );

    if (!book) {
      return res.status(404).json({ success: false, error: "Book not found" });
    }

    res.status(200).json({ success: true, data: book });
  } catch (error) {
    // Handle validation errors specifically
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        error: "Validation failed",
        details: error.message,
      });
    }

    res.status(500).json({
      success: false,
      error: "Server error: Failed to update book",
      details: error.message,
    });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res
        .status(400)
        .json({ success: false, error: "Missing params: Book ID!" });
    }

    const deletedBook = await Book.findByIdAndDelete(id);

    if (!deletedBook) {
      return res.status(404).json({ success: false, error: "Book not found!" });
    }

    res.json({ success: true, message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Server error: Could not delete book.",
      details: error.message,
    });
  }
};
