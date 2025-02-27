import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { getBaseURL } from "../../utils/getBaseURL";
import axios from "axios";

const initialState = {
  cartItems: [],
  totalPrice: 0,
  isLoading: false,
};

export const createOrder = createAsyncThunk(
  "orders/create",
  async (orderData, { rejectWithValue }) => {
    try {
      const url = `${getBaseURL()}/api/orders/create`;
      const response = await axios.post(url, orderData);
      console.log("API Response:", response);
      return response.data;
    } catch (error) {
      console.error("Error creating order:", error);
      return rejectWithValue(error.response.data || "Unknown error occurred");
    }
  }
);

const BooksCartSlice = createSlice({
  name: "booksCart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.cartItems.find(
        (item) => item._id === action.payload._id
      );

      if (existingItem) {
        existingItem.quantity++;
        state.totalPrice += existingItem.newPrice;
        toast.success(`Quantity increased for ${existingItem.title}`);
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 });
        state.totalPrice += action.payload.newPrice;
        toast.success(`${action.payload.title} added to cart!`);
      }
    },
    removeFromCart: (state, action) => {
      const item = state.cartItems.find(
        (item) => item._id === action.payload._id
      );

      if (item) {
        state.totalPrice -= item.newPrice * item.quantity;
        state.cartItems = state.cartItems.filter(
          (item) => item._id !== action.payload._id
        );
        toast.success(`${action.payload.title} removed from cart!`);
      }
    },
    incrementQuantity: (state, action) => {
      const item = state.cartItems.find(
        (item) => item._id === action.payload._id
      );

      if (item) {
        item.quantity++;
        state.totalPrice += item.newPrice;
      } else {
        toast.error(`${item.title} is out of stock!`);
      }
    },
    decrementQuantity: (state, action) => {
      const item = state.cartItems.find(
        (item) => item._id === action.payload._id
      );

      if (item && item.quantity > 1) {
        item.quantity--;
        state.totalPrice -= item.newPrice;
      } else if (item && item.quantity === 1) {
        state.totalPrice -= item.newPrice;
        state.cartItems = state.cartItems.filter(
          (item) => item._id !== action.payload._id
        );
      }
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.totalPrice = 0;
      toast.success("Cart cleared!");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createOrder.fulfilled, (state) => {
        state.isLoading = false;
        state.cartItems = [];
        state.totalPrice = 0;
        toast.success("Order placed successfully!");
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false;
        toast.error("Failed to create the order!");
        console.error("Error creating order: ", action.error);
      });
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart,
} = BooksCartSlice.actions;
export default BooksCartSlice.reducer;
