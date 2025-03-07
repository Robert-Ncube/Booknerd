import React from "react";
import { FiHeart, FiShoppingCart } from "react-icons/fi";
import { getImageURL } from "../utils/getImgUrl";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/features/CartSlice";
import { removeFromFavourates } from "../redux/features/favouratesSlice";
import { useAuth } from "../context/AuthContext";
import { IoMdHeart } from "react-icons/io";

const BookCard = ({ book, show }) => {
  const { currentUser } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const handleRemoveFromFavourates = (id) => {
    if (currentUser) {
      dispatch(removeFromFavourates({ bookId: id, userId: currentUser.uid }));
    } else {
      toast.error("Please log in to remove from favourates.");
    }
  };

  return (
    <div className=" rounded-lg w-full transition-shadow duration-300 bg-slate-200 shadow-sm shadow-slate-800">
      <div className="flex flex-col sm:flex-row sm:items-center sm:h-72  sm:justify-center">
        <div className="sm:h-72 sm:flex-shrink-0 rounded-md">
          <Link to={`/books/${book._id}`}>
            <img
              src={`${getImageURL(book?.coverImage)}`}
              alt="book photo"
              className="w-full h-full bg-cover p-2 rounded-lg cursor-pointer hover:scale-95 transition-all duration-200"
            />
          </Link>
        </div>

        <div className=" w-full h-full flex flex-col justify-between md:p-0">
          <Link to={`/books/${book._id}`}>
            <h3 className="text-xl px-4 py-2 font-semibold hover:text-blue-600 mb-3">
              {book?.title}
            </h3>
          </Link>
          <p className="text-gray-600 px-4">
            {book?.description.length > 60
              ? `${book.description.slice(0, 60)}...`
              : book?.description}
          </p>
          <p className="font-medium text-green-600 px-4">
            ${book?.newPrice.toFixed(2)}{" "}
            {book?.oldPrice && (
              <span className="line-through font-normal ml-2 text-red-300">
                $ {book?.oldPrice.toFixed(2)}
              </span>
            )}
          </p>

          <div className="flex px-4 py-2 gap-4">
            <button
              onClick={() => handleAddToCart(book)}
              title="add to cart"
              className="bg-tprimary px-2 lg:px-6 text-sm lg:text-lg py-2 rounded-lg space-x-1 flex items-center gap-1 font-bold"
            >
              <FiShoppingCart className="" />
              Add to Cart
            </button>
            {show && (
              <button
                onClick={() => handleRemoveFromFavourates(book._id)}
                title="add to cart"
                className="flex items-center gap-2 px-6 py-2 bg-gray-400 text-white rounded-lg font-bold transition-all duration-200"
              >
                <IoMdHeart />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
