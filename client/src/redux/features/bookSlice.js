import axios from "axios";
import toast from "react-hot-toast";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getBaseURL } from "../../utils/getBaseURL";

const initialState = {
  books: [],
  isLoading: false,
  bookDetails: null,
};

export const fetchAllBooks = createAsyncThunk("books/all", async () => {
  const url = `${getBaseURL()}/api/books/all`;
  console.log("url: ", url);

  try {
    const response = await axios.get(url, {
      withCredentials: true,
    });
    console.log("books response:", response?.data);

    return response?.data;
  } catch (error) {
    toast.error("Failed to fetch books");
    console.error("Error fetching books: ", error);
    throw error;
  }
});

export const getBookById = createAsyncThunk("/books/:id", async (id) => {
  const url = `${getBaseURL()}/api/books/${id}`;
  try {
    const response = await axios.get(url);
    return response?.data;
  } catch (error) {
    toast.error("Failed to fetch book details");
    console.error("Error fetching book details: ", error);
    throw error;
  }
});

export const createBook = createAsyncThunk("/books/create", async (book) => {
  const url = `${getBaseURL()}/api/books/create`;

  try {
    const response = await axios.post(url, book);
    return response?.data;
  } catch (error) {
    toast.error("Failed to create book");
    console.error("Error creating book: ", error);
    throw error;
  }
});

export const updateBook = createAsyncThunk(
  "books/update",
  async ({ id, ...cleanData }) => {
    try {
      const response = await axios.put(
        `${getBaseURL()}/api/books/${id}`, // Remove "/update" from endpoint
        cleanData // Send data directly without wrapping
      );
      return response.data;
    } catch (error) {
      console.error("Update error:", error.response?.data);
      throw error;
    }
  }
);

export const deleteBook = createAsyncThunk("books/delete", async (bookId) => {
  try {
    await axios.delete(`${getBaseURL()}/api/books/delete/${bookId}`);
    return bookId;
  } catch (error) {
    console.error("Delete error:", error.response?.data);
    throw error;
  }
});

const BookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    setBookDetails: (state) => {
      state.bookDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      //For fetchAllBooks
      .addCase(fetchAllBooks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllBooks.fulfilled, (state, action) => {
        state.books = action.payload.data;
        state.isLoading = false;
        //console.log("books:", action.payload.data);
      })
      .addCase(fetchAllBooks.rejected, (state, action) => {
        state.isLoading = false;
        console.error("Error fetching books: ", action.error);
      })

      // For getBookById
      .addCase(getBookById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBookById.fulfilled, (state, action) => {
        state.bookDetails = action.payload.data;
        state.isLoading = false;
        //console.log("book details:", action.payload);
      })
      .addCase(getBookById.rejected, (state, action) => {
        state.isLoading = false;
        console.error("Error fetching book details: ", action.error);
      })

      // For createBook
      .addCase(createBook.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBook.fulfilled, (state, action) => {
        state.isLoading = false;
        toast.success("Book created successfully!");
        console.log("book created:", action.payload);
      })
      .addCase(createBook.rejected, (state, action) => {
        state.isLoading = false;
        toast.error("Failed to create book");
        console.error("Error creating book: ", action.error);
      })
      // For updateBook
      .addCase(updateBook.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateBook.fulfilled, (state, action) => {
        state.isLoading = false;
        toast.success("Book updated successfully!");
        console.log("book updated:", action.payload);
      })
      .addCase(updateBook.rejected, (state, action) => {
        state.isLoading = false;
        toast.error("Failed to update book");
        console.error("Error updating book: ", action.error);
      })
      // For deleteBook
      .addCase(deleteBook.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteBook.fulfilled, (state, action) => {
        state.isLoading = false;
        toast.success("Book deleted successfully!");
        console.log("book deleted:", action.payload);
      })
      .addCase(deleteBook.rejected, (state, action) => {
        state.isLoading = false;
        toast.error("Failed to delete book");
        console.error("Error deleting book: ", action.error);
      });
  },
});

export const { setBookDetails } = BookSlice.actions;

export default BookSlice.reducer;
