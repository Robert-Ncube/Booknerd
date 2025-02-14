import React from "react";
import { FiShoppingCart } from "react-icons/fi";
import { getImageURL } from "../utils/getImgUrl";

import { Link } from "react-router-dom";
import Button from "./Button";

import { useDispatch } from "react-redux";
import { addToCart } from "../redux/features/CartSlice";

const BookCard = ({ book }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <div className=" rounded-lg transition-shadow duration-300 bg-slate-200 shadow-sm shadow-slate-800">
      <div className="flex flex-col sm:flex-row sm:items-center sm:h-72  sm:justify-center gap-4">
        <div className="sm:h-72 sm:flex-shrink-0 rounded-md">
          <Link to={`/books/${book._id}`}>
            <img
              src={`${getImageURL(book?.coverImage)}`}
              alt=""
              className="w-full bg-cover p-2 rounded-md cursor-pointer hover:scale-105 transition-all duration-200"
            />
          </Link>
        </div>

        <div className="p-4 md:p-0">
          <Link to={`/books/${book._id}`}>
            <h3 className="text-xl font-semibold hover:text-blue-600 mb-3">
              {book?.title}
            </h3>
          </Link>
          <p className="text-gray-600 mb-5">
            {book?.description.length > 80
              ? `${book.description.slice(0, 80)}...`
              : book?.description}
          </p>
          <p className="font-medium mb-5 text-green-600">
            ${book?.newPrice}{" "}
            <span className="line-through font-normal ml-2 text-red-300">
              $ {book?.oldPrice}
            </span>
          </p>
          <button
            onClick={() => handleAddToCart(book)}
            className="bg-tprimary px-6 py-2 rounded-lg space-x-1 flex items-center gap-1 font-bold"
          >
            <FiShoppingCart className="" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
