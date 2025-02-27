import { configureStore } from "@reduxjs/toolkit";
import BooksCartSlice from "./features/CartSlice";
import BookSlice from "./features/bookSlice";
import OrdersSlice from "./features/OrdersSlice";

export const store = configureStore({
  reducer: {
    cart: BooksCartSlice,
    books: BookSlice,
    orders: OrdersSlice,
  },
});
