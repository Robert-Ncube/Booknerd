import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getBaseURL } from "../../utils/getBaseURL";

const initialState = {
  orders: [],
  userOrders: [],
  loading: false,
  error: null,
};

// Thunk to get all orders (admin)
export const getAllOrders = createAsyncThunk(
  "orders/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const url = `${getBaseURL()}/api/orders/all`;
      const response = await axios.get(url);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk to get orders by email
export const getOrdersByEmail = createAsyncThunk(
  "orders/getByEmail",
  async (email, { rejectWithValue }) => {
    try {
      const url = `${getBaseURL()}/api/orders/user?email=${email}`;
      const response = await axios.get(url);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk to update order status
export const updateOrderStatus = createAsyncThunk(
  "orders/updateStatus",
  async ({ orderId, status }, { rejectWithValue }) => {
    try {
      console.log("orderId:", orderId);
      console.log("status:", status);

      const url = `${getBaseURL()}/api/orders/update-status/${orderId}`;
      const response = await axios.put(url, { status });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    clearOrders: (state) => {
      state.orders = [];
      state.userOrders = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // For getAllOrders
      .addCase(getAllOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error || "Failed to fetch orders";
      })

      // For getOrdersByEmail
      .addCase(getOrdersByEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrdersByEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.userOrders = action.payload;
      })
      .addCase(getOrdersByEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error || "Failed to fetch user orders";
      })

      // For updateOrderStatus
      .addCase(updateOrderStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.loading = false;
        const updatedOrders = state.orders.map((order) =>
          order._id === action.payload._id ? action.payload : order
        );
        state.orders = updatedOrders;
        state.error = null;
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error || "Failed to update order status";
      });
  },
});

export const { clearOrders } = ordersSlice.actions;
export default ordersSlice.reducer;
