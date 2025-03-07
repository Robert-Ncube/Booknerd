import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllBooks,
  setBookDetails,
  deleteBook,
} from "../redux/features/bookSlice";
import CreateBookForm from "../pages/dashboard/CreateBookForm";

const BookList = () => {
  const dispatch = useDispatch();
  const { books, isLoading } = useSelector((state) => state.books);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchAllBooks());
  }, [dispatch]);

  const handleEdit = (book) => {
    console.log("bookToEdit:", book);

    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const handleDelete = (bookId, title) => {
    if (window.confirm(`Are you sure you want to delete ${title}?`)) {
      dispatch(deleteBook(bookId)).then(() => {
        dispatch(fetchAllBooks());
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {isLoading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded-lg shadow-lg">
            <thead className="bg-gray-50">
              <tr>
                {["#", "Title", "Stock", "Price", "Actions"].map(
                  (header, index) => (
                    <th
                      key={index}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b"
                    >
                      {header}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {books.map((book, index) => (
                <tr key={book._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {book.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {book.stock}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${book.newPrice.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleEdit(book)}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(book._id, book.title)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl">
            <CreateBookForm
              closeModal={() => {
                setIsModalOpen(false);
                setSelectedBook(null);
              }}
              existingBook={selectedBook}
              isEditMode={true}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default BookList;
