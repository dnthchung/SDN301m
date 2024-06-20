import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  // console.log(user);

  return (
    <>
      <nav className="bg-blue-600 p-4">
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="text-white hover:text-gray-300">
              Home
            </Link>
          </li>
          <li>
            <Link to="/todo" className="text-white hover:text-gray-300">
              Home to do
            </Link>
          </li>
          <li>
            <Link to="/about" className="text-white hover:text-gray-300">
              About
            </Link>
          </li>

          {user ? (
            <>
              <li>
                <button
                  onClick={() => {
                    localStorage.removeItem("user");
                    window.location.reload();
                  }}
                  className="text-white hover:text-gray-300"
                >
                  Logout
                </button>
              </li>
              <li>
                <p className="text-yellow-50">Account - {user.user.email}</p>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className="text-white hover:text-gray-300">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-white hover:text-gray-300">
                  Register
                </Link>
              </li>
            </>
          )}

          <li>
            <Link
              to="/admin/dashboard"
              className="text-white hover:text-gray-300"
            >
              Dashboard
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Header;
