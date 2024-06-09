import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import instance from "../../axios";
import { useParams } from "react-router-dom";

const ProductForm = ({ handleProduct }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { id } = useParams();

  if (id) {
    useEffect(() => {
      (async () => {
        try {
          const { data } = await instance.get(`/products/${id}`);
          console.log(data);
          handleProduct(data);
        } catch (error) {
          console.log(error);
        }
      })();
    }, []);
  }

  const onSubmit = (data) => {
    console.log(data);
    //onMyAdd(data); ở bên App.jsx
    // khai báo thằng nhận bên app.jsx xong truyền xuống cho thằng con, tằng con nhận xong truyền
    //lại lên thằng cha
    onMyAdd(data);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">
        {id ? "Edit Product" : "Add New Product"}
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            name="title"
            {...register("title", { required: "Title is required" })}
            className="w-full px-3 py-2 border rounded"
          />
          {errors.title && (
            <span className="text-red-500">{errors.title.message}</span>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            name="description"
            {...register("description", {
              required: "Description is required",
            })}
            className="w-full px-3 py-2 border rounded"
          />
          {errors.description && (
            <span className="text-red-500">{errors.description.message}</span>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="price">
            Price
          </label>
          <input
            type="number"
            name="price"
            {...register("price", {
              required: "Price is required",
              valueAsNumber: true,
            })}
            className="w-full px-3 py-2 border rounded"
          />
          {errors.price && (
            <span className="text-red-500">{errors.price.message}</span>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="category">
            Category
          </label>
          <input
            type="text"
            name="category"
            {...register("category", { required: "Category is required" })}
            className="w-full px-3 py-2 border rounded"
          />
          {errors.category && (
            <span className="text-red-500">{errors.category.message}</span>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="stock">
            Stock
          </label>
          <input
            type="number"
            name="stock"
            {...register("stock", {
              required: "Stock is required",
              valueAsNumber: true,
            })}
            className="w-full px-3 py-2 border rounded"
          />
          {errors.stock && (
            <span className="text-red-500">{errors.stock.message}</span>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="brand">
            Brand
          </label>
          <input
            type="text"
            name="brand"
            {...register("brand", { required: "Brand is required" })}
            className="w-full px-3 py-2 border rounded"
          />
          {errors.brand && (
            <span className="text-red-500">{errors.brand.message}</span>
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          {id ? "Edit Product" : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
