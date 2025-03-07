import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import {
  createBook,
  fetchAllBooks,
  updateBook,
} from "../../redux/features/bookSlice";
import { IoClose } from "react-icons/io5";

const CreateBookForm = ({ closeModal, existingBook, isEditMode }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      category: "",
      description: "",
      newPrice: "",
      oldPrice: "",
      stock: "",
      trending: false,
      favourate: false,
      coverImage: null,
    },
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (existingBook) {
      // Set form values for existing book
      Object.entries(existingBook).forEach(([key, value]) => {
        if (key === "coverImage") {
          // Create FileList mock for existing image
          const file = new File([], value, { type: "image/jpeg" });
          const dataTransfer = new DataTransfer();
          dataTransfer.items.add(file);
          setValue("coverImage", dataTransfer.files);
        } else {
          setValue(key, value);
        }
      });
    }
  }, [existingBook, setValue]);

  const onSubmit = async (data) => {
    try {
      const formData = {
        title: data.title,
        category: data.category,
        description: data.description,
        newPrice: data.newPrice,
        oldPrice: data.oldPrice,
        stock: data.stock,
        trending: data.trending || false,
      };

      // Handle cover image
      if (data.coverImage?.length > 0) {
        formData.coverImage = data.coverImage[0].name;
      } else if (existingBook) {
        formData.coverImage = existingBook.coverImage;
      }

      // Remove MongoDB-specific fields
      const cleanData = Object.fromEntries(
        Object.entries(formData).filter(
          ([key]) => !["_id", "__v", "id"].includes(key)
        )
      );

      if (isEditMode) {
        await dispatch(
          updateBook({
            id: existingBook._id, // Use MongoDB _id
            ...cleanData,
          })
        );
        dispatch(fetchAllBooks());
      } else {
        await dispatch(createBook(cleanData));
        dispatch(fetchAllBooks());
      }

      closeModal();
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  return (
    <div className="max-w-lg h-80 md:h-92 lg:h-[40rem] overflow-y-auto mx-auto p-6 bg-white shadow-md rounded-md">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold font-rubik py-2 border-b-2 mb-4">
          {isEditMode ? "Edit Book" : "Add a New Book"}
        </h2>
        <button
          onClick={closeModal}
          className="text-gray-700 hover:text-gray-900"
        >
          <IoClose size={24} />
        </button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Title Input */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="title">
            Title
          </label>
          <input
            {...register("title", { required: "Title is required" })}
            className="w-full px-3 py-2 border rounded-md shadow-sm shadow-slate-600"
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>

        {/* Category Input */}
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="category"
          >
            Category
          </label>
          <input
            {...register("category", { required: "Category is required" })}
            className="w-full px-3 py-2 border rounded-md shadow-sm shadow-slate-600"
          />
          {errors.category && (
            <p className="text-red-500 text-sm">{errors.category.message}</p>
          )}
        </div>

        {/* Cover Image Input */}
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="coverImage"
          >
            Cover Image{" "}
            {isEditMode && (
              <span className="text-sm text-gray-500">
                (Current: {existingBook?.coverImage})
              </span>
            )}
          </label>
          <input
            type="file"
            {...register("coverImage", {
              required: !isEditMode && "Cover image is required",
            })}
            className="w-full px-3 py-2 border rounded-md shadow-sm shadow-slate-600"
          />
          {errors.coverImage && (
            <p className="text-red-500 text-sm">{errors.coverImage.message}</p>
          )}
        </div>

        {/* Description Input */}
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            className="w-full px-3 py-2 border rounded-md shadow-sm shadow-slate-600"
            rows="4"
          ></textarea>
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>

        {/* Price Inputs */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="newPrice"
            >
              New Price
            </label>
            <input
              type="number"
              step="0.01"
              {...register("newPrice", {
                required: "New price is required",
              })}
              className="w-full px-3 py-2 border rounded-md shadow-sm shadow-slate-600"
            />
            {errors.newPrice && (
              <p className="text-red-500 text-sm">{errors.newPrice.message}</p>
            )}
          </div>

          <div>
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="oldPrice"
            >
              Old Price
            </label>
            <input
              type="number"
              step="0.01"
              {...register("oldPrice")}
              className="w-full px-3 py-2 border rounded-md shadow-sm shadow-slate-600"
            />
          </div>
        </div>

        {/* Stock Input */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="stock">
            Stock
          </label>
          <input
            type="number"
            {...register("stock", {
              required: "Stock is required",
            })}
            className="w-full px-3 py-2 border rounded-md shadow-sm shadow-slate-600"
          />
          {errors.stock && (
            <p className="text-red-500 text-sm">{errors.stock.message}</p>
          )}
        </div>

        {/* Checkboxes */}
        <div className="mb-4 flex items-center space-x-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              {...register("trending")}
              className="mr-2"
              id="trending"
            />
            <label className="text-gray-700 font-bold" htmlFor="trending">
              Trending
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-all"
        >
          {isEditMode ? "Update Book" : "Add Book"}
        </button>
      </form>
    </div>
  );
};

export default CreateBookForm;
