import React from "react";
import { FaGoogle } from "react-icons/fa";
import banner from "../assets/banner.png";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="email">
              Enter your email & password to log in
            </label>
            <input type="email" id="email" className="w-full px-3 py-2 border rounded" placeholder="email@domain.com" />
          </div>
          <div className="mb-4">
            <input type="password" id="password" className="w-full px-3 py-2 border rounded" placeholder="Password" />
          </div>
          <div className="mb-4 flex items-center justify-between">
            <label className="flex items-center">
              <input type="checkbox" className="form-checkbox" />
              <span className="ml-2">Remember Me</span>
            </label>
            <a href="#" className="text-sm text-blue-500 hover:underline">
              Forgot Password?
            </a>
          </div>
          <button type="submit" className="w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-800">
            Login
          </button>
        </form>
        <div className="mt-4 text-center text-gray-600">or continue with</div>
        <button className="w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded flex items-center justify-center mt-4">
          <FaGoogle className="mr-2" /> Google
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
