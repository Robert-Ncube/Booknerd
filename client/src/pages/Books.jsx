import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllBooks } from "../redux/features/bookSlice";

import { AiOutlineLoading3Quarters } from "react-icons/ai";
import BookCard from "../components/BookCard";
import { Outlet } from "react-router-dom";

const Books = () => {
  const dispatch = useDispatch();
  const { books, isLoading } = useSelector((state) => state.books);

  useEffect(() => {
    dispatch(fetchAllBooks());
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full min-h-screen gap-4">
        <AiOutlineLoading3Quarters className="text-5xl animate-spin" />
        <h2 className="font-rubik text-sm ">Loading</h2>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen py-6">
      <h2 className="text-xl md:text-3xl lg:text-5xl border-b py-4 font-semibold font-rubik mb-6">
        All Books
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center justify-center gap-6">
        {books.map((book, idx) => (
          <BookCard key={idx} book={book} />
        ))}
      </div>
    </div>
  );
};

export default Books;
