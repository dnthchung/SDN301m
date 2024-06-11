import React from "react";
import { CiHeart, CiShoppingCart } from "react-icons/ci";

const ProductCard = () => {
  return (
    <div className="max-w-xs bg-white rounded-lg shadow-md overflow-hidden">
      <img
        className="w-full"
        src="https://via.placeholder.com/150" // Replace with the actual image source
        alt="Product"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold">Áo Thể Thao Adidas</h3>
        <div className="flex items-center my-2">
          <div className="flex items-center">
            <span className="text-yellow-500">★★★★☆</span>
            <span className="text-gray-600 ml-2">(123 reviews)</span>
          </div>
        </div>
        <div className="text-xl font-bold text-red-500">1.000.000 đ</div>
        <div className="flex space-x-2 my-2">
          <div className="w-6 h-6 bg-red-500 rounded-full"></div>
          <div className="w-6 h-6 bg-black rounded-full"></div>
          <div className="w-6 h-6 bg-yellow-500 rounded-full"></div>
          <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
          <div className="w-6 h-6 bg-green-500 rounded-full"></div>
        </div>
        <div className="flex justify-between items-center mt-4">
          <button className="flex items-center bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-1 px-4 rounded">
            <CiShoppingCart className="mr-2" /> Add to cart
          </button>
          <button className="text-red-500 hover:text-red-600">
            <CiHeart size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
