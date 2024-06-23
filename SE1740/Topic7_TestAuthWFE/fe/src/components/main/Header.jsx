import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-gray-800 p-4">
      <nav className="flex justify-between items-center">
        <div className="text-white text-lg font-bold">
          <Link to="/">MyApp</Link>
        </div>
        <div>
          <Link to="/signin" className="bg-blue-500 text-white py-2 px-4 rounded mr-2 hover:bg-blue-700">
            Login
          </Link>
          <Link to="/signup" className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700">
            Register
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
