import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllBooks, setBookDetails } from "../redux/features/bookSlice";

const BookList = () => {
  const dispatch = useDispatch();
  const { books, isLoading } = useSelector((state) => state.books);

  useEffect(() => {
    dispatch(fetchAllBooks());
  }, [dispatch]);

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      <ul>
        {books.map((book) => (
          <li key={book.id}>{book.title}</li>
        ))}
      </ul>
      <button onClick={() => dispatch(setBookDetails())}>
        Clear Book Details
      </button>
    </div>
  );
};

export default BookList;
