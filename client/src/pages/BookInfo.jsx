import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getBookById } from "../redux/features/bookSlice";
import { FiShoppingCart, FiHeart } from "react-icons/fi";
import { getImageURL } from "../utils/getImgUrl";
import { addToCart } from "../redux/features/CartSlice";
import { IoClose } from "react-icons/io5";
import { IoMdHeart } from "react-icons/io";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import {
  fetchFavouratesByUserId,
  addToFavourates,
  removeFromFavourates,
} from "../redux/features/favouratesSlice";

const BookInfo = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { bookDetails, isLoading, error } = useSelector((state) => state.books);
  const { favourates } = useSelector((state) => state.favourates);
  const { currentUser } = useAuth();
  //console.log("user:", currentUser);

  useEffect(() => {
    if (currentUser) {
      dispatch(getBookById(id));
      dispatch(fetchFavouratesByUserId(currentUser?.uid));
    }
  }, [dispatch, id, currentUser]);

  // Check if book is in favourates
  const isFavourate = favourates.find((favourate) => favourate.bookId === id);

  const handleAddToCart = () => {
    dispatch(addToCart(bookDetails));
  };

  const handleAddToFavourates = () => {
    if (currentUser) {
      dispatch(addToFavourates({ bookId: id, userId: currentUser.uid }));
    } else {
      toast.error("Please log in to add to favourates.");
    }
  };

  const handleRemoveFromFavourates = () => {
    if (currentUser) {
      dispatch(removeFromFavourates({ bookId: id, userId: currentUser.uid }));
    } else {
      toast.error("Please log in to remove from favourates.");
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    bookDetails && (
      <div className="w-full min-h-screen py-10 px-6 bg-gray-100">
        <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-md p-8 flex flex-col lg:flex-row gap-8">
          <div className="flex-shrink-0 lg:w-1/3">
            <img
              src={getImageURL(bookDetails.coverImage)}
              alt={bookDetails.title}
              className="w-full h-full object-cover rounded-md"
            />
          </div>
          <div className="flex-grow">
            <div className="flex items-center justify-between">
              <h1 className="text-4xl font-semibold text-gray-800 mb-4">
                {bookDetails.title}
              </h1>
              <IoClose
                size={28}
                onClick={() => navigate("/books")}
                className="cursor-pointer hover:text-gray-600"
              />
            </div>
            <p className="text-lg text-gray-600 mb-4">
              {bookDetails.description}
            </p>
            <p className="text-gray-500 mb-2 capitalize">
              <strong>Category:</strong> {bookDetails.category}
            </p>
            <p className="text-gray-500 mb-6">
              <strong>Trending:</strong> {bookDetails.trending ? "Yes" : "No"}
            </p>
            <div className="mb-6">
              <span className="text-3xl text-green-600 font-semibold">
                ${bookDetails.newPrice.toFixed(2)}
              </span>
              {bookDetails.oldPrice && (
                <span className="text-xl text-red-300 line-through ml-3">
                  ${bookDetails.oldPrice.toFixed(2)}
                </span>
              )}
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => handleAddToCart(bookDetails)}
                className="flex items-center gap-2 px-6 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded-lg font-bold transition-all duration-200"
              >
                <FiShoppingCart />
                Add to Cart
              </button>
              {isFavourate ? (
                <button
                  onClick={() => handleRemoveFromFavourates()}
                  className="flex items-center gap-2 px-6 py-2 bg-gray-400 text-white rounded-lg font-bold transition-all duration-200"
                >
                  <FiHeart />
                  Remove from Favourates
                </button>
              ) : (
                <button
                  onClick={() => handleAddToFavourates()}
                  className="flex items-center gap-2 px-6 py-2 bg-red-500 hover:bg-red-700 text-white rounded-lg font-bold transition-all duration-200"
                >
                  <IoMdHeart />
                  Add to Favourates
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default BookInfo;
