import React, { useState } from "react";
import { MdOutlinePerson } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { FaRegUserCircle } from "react-icons/fa";
import { RiLogoutBoxLine } from "react-icons/ri";
import { IoBagCheckOutline } from "react-icons/io5";
import { MdOutlineDashboard } from "react-icons/md";
import { AiOutlineProduct } from "react-icons/ai";
import { BsCartCheck } from "react-icons/bs";
import logo from "../assets/whitebg-logo.png";

import Button from "./Button";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const Cart = useSelector((state) => state.cart);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [openSearchBar, setOpenSearchBar] = useState(false);

  const { currentUser, signOutUser } = useAuth();
  console.log("user:", currentUser);
  console.log("userPhoto:", currentUser?.photoURL);

  const dropdownlinks = [
    {
      label: "Dashboard",
      path: "/dashboard",
      icon: <MdOutlineDashboard size={20} />,
    },
    {
      label: "Orders",
      path: "/orders",
      icon: <AiOutlineProduct size={20} />,
    },
    {
      label: "Cart Page",
      path: "/cart",
      icon: <BsCartCheck size={20} />,
    },
    {
      label: "Checkout",
      path: "/checkout",
      icon: <IoBagCheckOutline size={20} />,
    },
  ];

  console.log("cartItems", cartItems);
  console.log("Cart", Cart);

  const totalBooksInCart = cartItems.reduce((total, book) => {
    return total + book.quantity;
  }, 0);

  const handleSignOut = () => {
    signOutUser();
    setOpenDropdown(false);
  };

  return (
    <nav>
      <div className="flex flex-row max-w-full items-center justify-between border-b pb-4 border-gray-400">
        <div className="flex flex-row px-2 items-center justify-between gap-4 md:gap-8 w-full">
          <Link to={"/"}>
            <img src={logo} className="w-20 h-15" title="home" />
          </Link>
          <div className="relative w-full">
            <Button
              title={"Search"}
              styles={
                "bg-slate-400 px-2 py-1 rounded-lg flex flex-row gap-2 items-center justify-center"
              }
              onClick={() => setOpenSearchBar(!openSearchBar)}
              icon={<CiSearch size={20} className="font-bold" />}
            />
            {openSearchBar && (
              <div className="absolute -left-10 sm:-left-5 md:left-5 mt-2 flex flex-row items-center justify-center w-64 md:w-full px-4 py-2 bg-gray-300 rounded-md">
                <CiSearch size={20} className="font-bold" />
                <input
                  placeholder="What are you looking for?"
                  className="ml-2 w-full px-4 py-1 bg-gray-300 outline-none focus:outline-none"
                />
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-row w-full items-center justify-end gap-2">
          {currentUser ? (
            <div className="relative">
              <div className="flex items-center gap-2">
                <button
                  className="bg-none p-0"
                  onClick={() => setOpenDropdown(!openDropdown)}
                >
                  {
                    <FaRegUserCircle
                      size={20}
                      title={currentUser?.displayName || currentUser?.email}
                      className="text-primary p-1 rounded-full h-full w-full shadow-sm shadow-black hover:bg-slate-200"
                    />
                  }
                </button>
                <div className="hidden md:flex flex-col items-center">
                  <p className="text-sm font-bold font-rubik text-gray-600">
                    {currentUser?.displayName}
                  </p>
                </div>
              </div>

              {openDropdown && (
                <div className="absolute -right-6 md:right-0 p-2 mt-2 w-48 bg-white rounded-md shadow-md shadow-gray-800 z-20">
                  <ul className="list-none">
                    {dropdownlinks.map((link, index) => (
                      <li
                        key={index}
                        title={link.label}
                        className={`py-1 hover:bg-gray-200 p-1`}
                      >
                        <button
                          onClick={() => {
                            setOpenDropdown(false);
                          }}
                        >
                          <Link
                            className=" flex flex-row w-full items-center gap-2"
                            to={link.path}
                          >
                            {link.icon}
                            {link.label}
                          </Link>
                        </button>
                      </li>
                    ))}
                    <li className="py-1 hover:bg-gray-200 p-1">
                      <button
                        title="logout"
                        onClick={handleSignOut}
                        className="flex flex-row w-full items-center gap-2"
                      >
                        <RiLogoutBoxLine size={20} />
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <Link
              to={"/login"}
              title="login"
              className="p-2 rounded-full bg-slate-200 hover:bg-slate-500"
            >
              <MdOutlinePerson size={20} />
            </Link>
          )}
          <Link
            to={"/favourates"}
            title="favourates"
            className="p-2 rounded-full hover:bg-slate-500"
          >
            <FaRegHeart size={18} />
          </Link>
          <Link to={"/cart"}>
            <Button
              title={cartItems.length > 0 ? totalBooksInCart : 0}
              styles={
                "bg-tprimary flex flex-row gap-1 items-center px-4 py-1 rounded-md"
              }
              icon={<IoCartOutline />}
            />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
