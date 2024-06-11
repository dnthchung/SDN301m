import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { CiHeart, CiShoppingCart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa6";
import instance from "../axios/index";

const ProductCard = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await instance.get(`/products/${id}`);
        setProduct(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating - fullStars >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <>
        {[...Array(fullStars)].map((_, index) => (
          <FaStar key={`full-${index}`} className="text-yellow-500" />
        ))}
        {halfStar && <FaStarHalfAlt className="text-yellow-500" />}
        {[...Array(emptyStars)].map((_, index) => (
          <FaRegStar key={`empty-${index}`} className="text-yellow-500" />
        ))}
      </>
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-4 max-w-xs relative">
      <div className="absolute top-2 right-2 bg-white hover:bg-gray-50 text-gray-800 py-1 px-2 border border-gray-200 rounded-full shadow flex items-center">
        <FaHeart className="text-red-500 h-7 w-5 opacity-75 hover:opacity-100" />
      </div>

      <img
        src={product.thumbnail}
        alt={product.title}
        className="w-full h-50 object-cover rounded-t-lg"
      />

      <div className="p-4">
        <h3 className="text-lg font-bold">{product.title}</h3>
        <div className="flex items-center">
          {renderStars(product.rating)}
          <span className="text-gray-600 ml-2">
            ({product.reviews.length} reviews)
          </span>
        </div>

        <p className="text-xl font-bold text-gray-800">{product.price} đ</p>

        <div className="flex space-x-2 mt-2">
          <div className="w-5 h-5 rounded-full bg-red-500"></div>
          <div className="w-5 h-5 rounded-full bg-yellow-500"></div>
          <div className="w-5 h-5 rounded-full bg-green-500"></div>
          <div className="w-5 h-5 rounded-full bg-black"></div>
          <div className="w-5 h-5 rounded-full bg-gray-500"></div>
        </div>
      </div>

      <div className="flex justify-between items-center p-4  mt-4">
        <button className="bg-white hover:bg-gray-50 text-gray-800 py-1 px-2 border border-gray-200 rounded shadow flex items-center">
          <CiShoppingCart
            className="h-5 w-5 opacity-75 hover:opacity-100 text-black"
            size={24}
          />
          <span> - Add to Cart</span>
        </button>

        <div className="flex space-x-2"></div>
      </div>
    </div>
  );
};

export default ProductCard;
