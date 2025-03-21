import { getBaseURL } from "../../utils/getBaseURL";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
  error: null,
  isLoading: false,
};

export const registerUser = createAsyncThunk(
  "/auth/register",
  async (formData, { rejectWithValue }) => {
    const url = `${getBaseURL()}/api/auth/register`;

    try {
      const response = await axios.post(url, formData, {
        withCredentials: true,
      });

      if (response.status !== 200 || !response.data.success) {
        throw new Error(response.data.error || "Could not register user");
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "/auth/login",
  async (formData, { rejectWithValue }) => {
    const url = `${getBaseURL()}/api/auth/login`;

    try {
      const response = await axios.post(url, formData, {
        withCredentials: true,
      });

      if (response.status !== 200 || !response.data.success) {
        throw new Error(response.data.error || "Could not register user");
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || error.message);
    }
  }
);

export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (token, { dispatch, rejectWithValue }) => {
    const url = `${getBaseURL()}/api/auth/check-auth`;
    try {
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      // Handle token expiration specifically
      if (error.response?.data?.isTokenExpired) {
        dispatch(logoutUser());
        sessionStorage.removeItem("token");
        return rejectWithValue("Token expired");
      }
      return rejectWithValue(error.response?.data?.error || error.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "/auth/logout",
  async (_, { dispatch }) => {
    const url = `${getBaseURL()}/api/auth/logout`;
    try {
      await axios.post(url, {}, { withCredentials: true });
    } finally {
      sessionStorage.removeItem("token");
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {},
    resetTokenAndCredentials: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      sessionStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true; // Adjust based on your logic
        state.user = action.payload.user;
        toast.success(action.payload.message);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        toast.error(action.payload);
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        sessionStorage.setItem("token", JSON.stringify(action.payload.token));
        console.log(action.payload.user);
        toast.success(action.payload.message);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        toast.error(action.payload);
      })
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        sessionStorage.removeItem("token");
        if (action.payload === "Token expired") {
          toast.error("Session expired. Please log in again.");
        }
      })
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        sessionStorage.removeItem("token");
        toast.success(action.payload.message);
      });
  },
});

export const { setUser, resetTokenAndCredentials } = authSlice.actions;
export default authSlice.reducer;
