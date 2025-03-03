import React, { useState } from "react";
import { createBook, fetchAllBooks } from "../../redux/features/bookSlice";
import { useDispatch } from "react-redux";

const CreateBookForm = ({ closeModal }) => {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    coverImage: "",
    description: "",
    newPrice: "",
    oldPrice: "",
    stock: "",
    trending: false,
    favourate: false,
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await dispatch(createBook(formData));
    if (createBook.fulfilled.match(response)) {
      setFormData({
        title: "",
        category: "",
        coverImage: "",
        description: "",
        newPrice: "",
        oldPrice: "",
        stock: "",
        trending: false,
        favourate: false,
      });
      dispatch(fetchAllBooks());
      closeModal(); // Call the function to close the modal
    } else {
      console.error(
        "Failed to create book:",
        response.payload || response.error
      );
    }
  };

  return (
    <div className="max-w-lg  h-80 md:h-92 overflow-y-auto mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold font-rubik py-2 border-b-2 mb-4">
        Add a New Book
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md shadow-sm shadow-slate-600"
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="category"
          >
            Category
          </label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md  shadow-sm shadow-slate-600"
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="coverImage"
          >
            Cover Image URL
          </label>
          <input
            type="text"
            id="coverImage"
            name="coverImage"
            value={formData.coverImage}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md  shadow-sm shadow-slate-600"
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md  shadow-sm shadow-slate-600"
            required
          ></textarea>
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="newPrice"
          >
            New Price
          </label>
          <input
            type="number"
            id="newPrice"
            name="newPrice"
            step="0.01" // Allows decimals
            value={formData.newPrice}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md  shadow-sm shadow-slate-600"
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="oldPrice"
          >
            Old Price
          </label>
          <input
            type="number"
            id="oldPrice"
            name="oldPrice"
            step="0.01" // Allows decimals
            value={formData.oldPrice}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md  shadow-sm shadow-slate-600"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="stock">
            Stock
          </label>
          <input
            type="number"
            id="stock"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md  shadow-sm shadow-slate-600"
            required
          />
        </div>

        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            id="trending"
            name="trending"
            checked={formData.trending}
            onChange={handleChange}
            className="mr-2"
          />
          <label className="text-gray-700 font-bold" htmlFor="trending">
            Trending
          </label>
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-all"
        >
          Add Book
        </button>
      </form>
    </div>
  );
};

export default CreateBookForm;
