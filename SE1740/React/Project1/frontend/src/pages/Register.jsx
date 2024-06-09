import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import instance from "../axios/index";
import * as z from "zod";
import { useNavigate } from "react-router-dom";

const schema = z.object({
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
  confirmPassword: z.string().min(6),
});

const Register = () => {
  const nav = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(
    { resolver: zodResolver(schema) } // Use zod as the
  );

  const onSubmit = async (data) => {
    (async () => {
      try {
        const rs = await instance.post("/register", data);
        console.log(rs);
        if (confirm("Register ok, Do you want to redirect to login page?")) {
          nav("/login");
        }
      } catch (error) {
        console.log(error);
        // ọc trong cái trả về là rõ
        alert(error.response.data || "Something went wrong");
      }
    })();
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="username">
            Username
          </label>
          <input
            type="text"
            name="username"
            {...register("username", { required: "Username is required" })}
            className="w-full px-3 py-2 border rounded"
          />
          {errors.username && (
            <span className="text-red-500">{errors.username.message}</span>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            name="email"
            {...register("email", { required: "Email is required" })}
            className="w-full px-3 py-2 border rounded"
          />
          {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            name="password"
            {...register("password", { required: "Password is required" })}
            className="w-full px-3 py-2 border rounded"
          />
          {errors.password && (
            <span className="text-red-500">{errors.password.message}</span>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="confirmPassword">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            {...register("confirmPassword", {
              required: "Please confirm your password",
            })}
            className="w-full px-3 py-2 border rounded"
          />
          {errors.confirmPassword && (
            <span className="text-red-500">
              {errors.confirmPassword.message}
            </span>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
