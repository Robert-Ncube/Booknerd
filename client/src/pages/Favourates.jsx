import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllBooks } from "../redux/features/bookSlice";
import BookCard from "../components/BookCard";
import { VscEmptyWindow } from "react-icons/vsc";

const Favourates = () => {
  const dispatch = useDispatch();
  const { books, isLoading } = useSelector((state) => state.books);

  useEffect(() => {
    dispatch(fetchAllBooks());
  }, [dispatch]);

  //console.log("books in comp:", books);

  // Filter books whose favourite = true
  const favouriteBooks = [];
  //books.filter((book) => book?.favourate === true);

  //console.log("favouriteBooks:", favouriteBooks);

  return (
    <div className="flex flex-col items-center p-4 justify-center w-full min-h-screen">
      <div className="w-full max-w-4xl">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="spinner-border text-primary" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : favouriteBooks?.length === 0 ? (
          <div className="flex flex-col items-center">
            <VscEmptyWindow className="h-12 md:h-24 w-12 md:w-24 m-4 text-primary" />
            <h2 className="text-center text-2xl font-semibold font-rubik">
              No favourite books found.
            </h2>
            <p className="text-sm text-gray-800">
              Try adding some to your collection
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
            {favouriteBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        )}
      </div>
      <div className="flex flex-row justify-center gap-2">
        <Link
          to="/"
          className="text-sm font-medium border border-slate-800 py-1 px-2 my-3 rounded-lg text-gray-600 hover:bg-gray-200"
        >
          View All Books
        </Link>
      </div>
    </div>
  );
};

export default Favourates;
