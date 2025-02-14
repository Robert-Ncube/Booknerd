import { configureStore } from "@reduxjs/toolkit";
import BooksCartSlice from "./features/CartSlice";

export const store = configureStore({
  reducer: {
    cart: BooksCartSlice,
  },
});
