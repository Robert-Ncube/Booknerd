import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { getBaseURL } from "../../utils/getBaseURL";
import axios from "axios";

const initialState = {
  favourates: [],
  isLoading: false,
  error: null,
};

export const fetchFavouratesByUserId = createAsyncThunk(
  "favourates/fetchFavourates",
  async (id, { rejectWithValue }) => {
    try {
      const url = `${getBaseURL()}/api/favs/${id}`;
      const response = await axios.get(url, {
        withCredentials: true,
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addToFavourates = createAsyncThunk(
  "favourates/addToFavourates",
  async ({ bookId, userId }, { rejectWithValue }) => {
    try {
      const url = `${getBaseURL()}/api/favs/add`;
      const response = await axios.post(url, { bookId, userId });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const removeFromFavourates = createAsyncThunk(
  "favourates/removeFromFavourates",
  async ({ bookId, userId }, { rejectWithValue }) => {
    try {
      const url = `${getBaseURL()}/api/favs/delete/${userId}/${bookId}`;
      const response = await axios.delete(url, {
        withCredentials: true,
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const favouratesSlice = createSlice({
  name: "favourates",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavouratesByUserId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchFavouratesByUserId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.favourates = action.payload;
        state.error = null;
        //console.log("fav books, response:", action.payload);
      })
      .addCase(fetchFavouratesByUserId.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        console.log("response:", action.payload);
      })
      .addCase(addToFavourates.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToFavourates.fulfilled, (state, action) => {
        toast.success("Book added to favourates!");
        state.favourates.push(action.payload);
      })
      .addCase(addToFavourates.rejected, (state, action) => {
        state.isLoading = false;
        toast.error("Failed to add to favourates!");
        state.error = action.payload;
        console.log("response:", action.payload);
      })
      .addCase(removeFromFavourates.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeFromFavourates.fulfilled, (state, action) => {
        toast.success("Book removed from favourites!");
        const index = state.favourates.findIndex(
          (favourite) => favourite._id === action.payload._id
        );
        state.favourates.splice(index, 1);
      })
      .addCase(removeFromFavourates.rejected, (state, action) => {
        state.isLoading = false;
        toast.error("Failed to remove from favourates!");
        state.error = action.payload;
        console.log("response:", action.payload);
      });
  },
});

export default favouratesSlice.reducer;
