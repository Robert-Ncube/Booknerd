import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllBooks } from "../redux/features/bookSlice";
import BookCard from "../components/BookCard";
import { VscEmptyWindow } from "react-icons/vsc";
import { fetchFavouratesByUserId } from "../redux/features/favouratesSlice";
import { useAuth } from "../context/AuthContext";

const Favourates = () => {
  const dispatch = useDispatch();
  const { books, isLoading, error } = useSelector((state) => state.books);
  const { favourates } = useSelector((state) => state.favourates);
  const { currentUser } = useAuth();
  const [favourateBooks, setFavourateBooks] = useState([]);

  useEffect(() => {
    if (currentUser) {
      dispatch(fetchFavouratesByUserId(currentUser?.uid));
    }
  }, [dispatch, currentUser]);

  useEffect(() => {
    if (favourates.length > 0 && books.length > 0) {
      const favBooks = books.filter((book) =>
        favourates.some((fav) => fav.bookId === book._id)
      );
      setFavourateBooks(favBooks);
    }
  }, [favourates, books]);

  useEffect(() => {
    dispatch(fetchAllBooks());
  }, [dispatch]);

  return (
    <div className="flex flex-col items-center p-4 justify-center w-full min-h-screen overflow-y-auto">
      <h2 className="text-2xl lg:text-5xl py-4 w-full border-b-2 font-semibold text-start font-rubik text-gray-800 mb-4">
        Your Favourate Books
      </h2>
      <div className="w-full">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="spinner-border text-primary" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : favourateBooks?.length === 0 ? (
          <div className="flex flex-col items-center">
            <VscEmptyWindow className="h-12 md:h-24 w-12 md:w-24 m-4 text-primary" />
            <h2 className="text-center text-2xl font-semibold font-rubik">
              No favourate books found.
            </h2>
            <p className="text-sm text-gray-800">
              Try adding some to your collection
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 w-full xl:grid-cols-3 gap-4 items-center">
            {favourateBooks.map((book) => (
              <BookCard show={true} favComp={true} key={book._id} book={book} />
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
