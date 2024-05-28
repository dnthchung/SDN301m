import React from "react";
import { Link } from "react-router-dom";
import iconCart from "../assets/images/iconCart.png";

const Header = () => {
  return (
    <header>
      <Link to="/" className="text-xl font-semibold">
        Home.
      </Link>
      <div className="w-10 h-10 bg-gray-100 rounded-full">
        <img src={iconCart} alt="cart" className="w-6" />
        <span>8</span>
      </div>
    </header>
  );
};

export default Header;
