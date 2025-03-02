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
        console.log("books:", action.payload.data);
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
      });
  },
});

export const { setBookDetails } = BookSlice.actions;

export default BookSlice.reducer;
