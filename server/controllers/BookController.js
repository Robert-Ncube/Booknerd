import Book from "../models/BookModel.js";

export const createBook = async (req, res) => {
  try {
    const book = req.body;

    // Check required fields (use ||)
    if (
      !book.title ||
      !book.description ||
      !book.category ||
      !book.coverImage ||
      !book.stock ||
      !book.oldPrice ||
      !book.newPrice
    ) {
      return res
        .status(400)
        .json({ success: false, error: "Missing required fields!" });
    }

    // Validate prices if provided
    if (
      (book.oldPrice !== undefined && book.oldPrice <= 0) ||
      (book.newPrice !== undefined && book.newPrice <= 0)
    ) {
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
    const { id } = req.params;
    const updates = req.body;

    // Validate ID
    if (!id) {
      return res.status(400).json({
        success: false,
        error: "Book ID is required",
      });
    }

    // Check for empty request body
    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        success: false,
        error: "No update data provided",
      });
    }

    // Validate numerical fields
    if (
      (updates.oldPrice !== undefined && updates.oldPrice <= 0) ||
      (updates.newPrice !== undefined && updates.newPrice <= 0)
    ) {
      return res.status(400).json({
        success: false,
        error: "Prices must be positive numbers",
      });
    }

    if (updates.stock !== undefined && updates.stock < 0) {
      return res.status(400).json({
        success: false,
        error: "Stock cannot be negative",
      });
    }

    // Find book and validate existence
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({
        success: false,
        error: "Book not found",
      });
    }

    // Define allowed fields and validate updates
    const allowedUpdates = [
      "title",
      "description",
      "category",
      "coverImage",
      "stock",
      "oldPrice",
      "newPrice",
      "trending",
      "favourite",
    ];

    const invalidUpdates = Object.keys(updates).filter(
      (key) => !allowedUpdates.includes(key)
    );

    if (invalidUpdates.length > 0) {
      return res.status(400).json({
        success: false,
        error: `Invalid fields: ${invalidUpdates.join(", ")}`,
      });
    }

    // Apply updates and check for changes
    let hasChanges = false;
    Object.entries(updates).forEach(([key, value]) => {
      if (book[key] !== value) {
        book[key] = value;
        hasChanges = true;
      }
    });

    if (!hasChanges) {
      return res.json({
        success: true,
        message: "No changes detected",
      });
    }

    // Save and return updated book
    const updatedBook = await book.save();
    res.json({
      success: true,
      data: updatedBook,
    });
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
