import React from "react";
import logo from "../assets/WEARIT.svg";
import { Link } from "react-router-dom";
import { CiUser, CiShoppingCart, CiHeart, CiLogout } from "react-icons/ci";

const Header = () => {
  return (
    <header className="border-b shadow-md">
      <div className="bg-black text-white py-2">
        <div className="container mx-auto flex justify-end items-center px-4">
          <div>
            <Link to="/register">Create an account</Link>
            <span className="ml-4 mr-4">|</span>
            <Link to="/login" className="mr-5">
              Sign in
            </Link>
          </div>
        </div>
      </div>
      <div className="container mx-auto flex justify-between items-center py-4 px-4">
        <div className="flex items-center">
          <Link to="/">
            <img src={logo} alt="brand logo" className="h-10 mr-5" />
          </Link>
          <nav>
            <Link to="/men" className="mx-2 text-lg font-semibold">
              Men
            </Link>
            <Link to="/women" className="mx-2 text-lg font-semibold">
              Women
            </Link>
          </nav>
        </div>
        <div className="flex items-center">
          <Link to="/cart" className="mr-4 relative">
            <button className="bg-white hover:bg-gray-50 text-gray-800 py-1 px-2 border border-gray-200 rounded shadow flex items-center">
              <CiShoppingCart className="h-5 w-5 opacity-75 hover:opacity-100 text-black" />
            </button>
            <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-red-500 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center">
              12
            </span>
          </Link>
          <Link to="/wishlist" className="mr-4">
            <button className="bg-white hover:bg-gray-50 text-gray-800 py-1 px-2 border border-gray-200 rounded shadow ">
              <CiHeart className="h-5 w-5 opacity-55 hover:opacity-85 text-black" />
            </button>
          </Link>
          <Link to="/profile" className="mr-4">
            <button className="bg-white hover:bg-gray-50 text-gray-800 py-1 px-2 border border-gray-200 rounded shadow ">
              <CiUser className="h-5 w-5 opacity-55 hover:opacity-85 text-black" />
            </button>
          </Link>
          <span className="ml-4 mr-4 opacity-25">|</span>
          <Link to="/sign-out" className="mr-7">
            <button className="bg-white hover:bg-gray-50 text-gray-800 py-1 px-2 border border-gray-200 rounded shadow ">
              <CiLogout className="h-5 w-5 opacity-55 hover:opacity-85 text-black" />
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
