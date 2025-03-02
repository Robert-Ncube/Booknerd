import { configureStore } from "@reduxjs/toolkit";
import BooksCartSlice from "./features/CartSlice";
import BookSlice from "./features/bookSlice";
import OrdersSlice from "./features/OrdersSlice";
import AuthSlice from "./features/authSlice";
import StatsSlice from "./features/statsSlice";

export const store = configureStore({
  reducer: {
    cart: BooksCartSlice,
    books: BookSlice,
    orders: OrdersSlice,
    auth: AuthSlice,
    stats: StatsSlice,
  },
});
