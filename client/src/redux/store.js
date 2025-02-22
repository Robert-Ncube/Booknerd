import { configureStore } from "@reduxjs/toolkit";
import BooksCartSlice from "./features/CartSlice";
import BookSlice from "./features/bookSlice";

export const store = configureStore({
  reducer: {
    cart: BooksCartSlice,
    books: BookSlice,
  },
});
