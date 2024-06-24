import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../App";

const Header = () => {
  const { userAuth, setUserAuth } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("accessToken");
    setUserAuth({ accessToken: null, user: null });
    navigate("/");
  };

  return (
    <header className="bg-gray-800 p-4">
      <nav className="flex justify-between items-center">
        <div className="text-white text-lg font-bold">
          <Link to="/">MyApp</Link>
        </div>
        <div>
          {userAuth && userAuth.accessToken ? (
            <>
              <span className="text-white mr-4">Hello, {userAuth.user.username}</span>
              {userAuth.user.role.name === "admin" && (
                <Link to="/dashboard" className="bg-yellow-500 text-white py-2 px-4 rounded mr-2 hover:bg-yellow-700">
                  Manage Users
                </Link>
              )}
              <button onClick={handleLogout} className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/signin" className="bg-blue-500 text-white py-2 px-4 rounded mr-2 hover:bg-blue-700">
                Login
              </Link>
              <Link to="/signup" className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700">
                Register
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
