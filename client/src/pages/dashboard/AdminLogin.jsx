import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { loginUser } from "../../redux/features/authSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const AdminLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [message, setMessage] = useState("");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log("data:", data);
    try {
      const response = await dispatch(loginUser(data)).unwrap(); // `unwrap` helps get the payload directly
      if (response) {
        toast.success("Logged in successfully!");
        setMessage("");
        navigate("/dashboard");
      } else {
        throw new Error("Invalid credentials!");
      }
    } catch (error) {
      setMessage("Please provide a valid email and password!");
      console.error(error.message);
    }
  };

  return (
    <div className="h-[calc(100vh-120px)] flex justify-center items-center ">
      <div className="w-full max-w-sm mx-auto bg-white shadow-md shadow-slate-800 rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl md:text-4xl font-semibold font-rubik text-center border-b py-2 mb-4">
          Admin Login
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              {...register("email", { required: true })}
              type="email"
              name="email"
              id="email"
              placeholder="Email Address"
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              {...register("password", { required: true })}
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow"
            />
          </div>
          {message && (
            <p className="text-red-500 text-xs italic mb-3">{message}</p>
          )}
          <div>
            <button className="bg-blue-500 hover:bg-blue-700 w-full text-white font-bold py-2 px-8 rounded focus:outline-none">
              Login{" "}
            </button>
          </div>
        </form>
        <p className="align-baseline font-light text-slate-600 mt-4 text-sm">
          For viewing purposes only, please refere to{" "}
          <a
            href="https://github.com/Robert-Ncube/Booknerd"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-700"
          >
            this Github repo
          </a>{" "}
          for login details.
        </p>

        <p className="mt-5 text-center text-gray-500 text-xs">
          ©2025 BookNerd. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
