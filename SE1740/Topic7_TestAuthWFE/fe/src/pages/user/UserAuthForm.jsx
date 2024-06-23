import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const UserAuthForm = ({ myType }) => {
  console.log("UserAuthForm: myType:", myType);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (myType === "sign-in") {
      // Handle sign-in logic here
      console.log("Sign In:", { username, password });
    } else {
      // Handle sign-up logic here
      console.log("Sign Up:", { username, password, email });
    }
    navigate("/");
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
