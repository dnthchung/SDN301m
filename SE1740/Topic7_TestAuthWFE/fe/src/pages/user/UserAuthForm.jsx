import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // Corrected import statement
import { UserContext } from "../../App";
import { toast } from "react-hot-toast";

const UserAuthForm = ({ myType }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const { userAuth, setUserAuth } = useContext(UserContext);
  const navigate = useNavigate();

  const userAuthThroughServer = async (serverRoute, formData) => {
    try {
      const { data } = await axios.post(`http://localhost:9999/api/auth${serverRoute}`, formData);
      const { accessToken } = data;
      const decodedToken = jwtDecode(accessToken);

      let date = new Date();
      if (decodedToken.exp < date.getTime() / 1000) {
        console.log("Token expired");
        sessionStorage.clear();
        toast.error("Session expired. Please sign in again.");
      } else {
        sessionStorage.setItem("accessToken", accessToken);
        sessionStorage.setItem("user", JSON.stringify(decodedToken));
        setUserAuth({ accessToken: accessToken, user: decodedToken });
        toast.success(myType === "sign-in" ? "Signed in successfully!" : "Signed up successfully!");
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const serverRoute = myType === "sign-in" ? "/signin" : "/signup";
    const formData = { username, password, ...(myType === "sign-up" && { email }) };
    userAuthThroughServer(serverRoute, formData);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">{myType === "sign-in" ? "Sign In" : "Sign Up"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Username</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full px-3 py-2 border rounded" required />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-3 py-2 border rounded" required />
        </div>
        {myType === "sign-up" && (
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-3 py-2 border rounded" required />
          </div>
        )}
        <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
          {myType === "sign-in" ? "Sign In" : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default UserAuthForm;
