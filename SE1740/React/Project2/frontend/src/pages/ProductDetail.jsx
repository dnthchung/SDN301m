import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import instance from "../axios/index";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { CiHeart, CiShoppingCart } from "react-icons/ci";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

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

  const handleQuantityChange = (delta) => {
    setQuantity((prevQuantity) =>
      Math.min(Math.max(1, prevQuantity + delta), product.stock)
    );
  };

  const handleQuantityInputChange = (event) => {
    const value = Math.max(
      1,
      Math.min(Number(event.target.value), product.stock)
    );
    setQuantity(value);
  };

  return (
    <div className="container mx-auto p-6 bg-white rounded shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex justify-center">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-3/4 h-auto rounded-lg"
          />
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
          <p className="text-xl text-gray-800 mb-4">
            ${product.price.toFixed(2)}
          </p>
          <div className="flex items-center mb-4">
            <FaStar className="text-yellow-500" />
            <FaStar className="text-yellow-500" />
            <FaStar className="text-yellow-500" />
            <FaStarHalfAlt className="text-yellow-500" />
            <FaRegStar className="text-yellow-500" />
            <span className="text-gray-600 ml-2">
              ({product.rating} rating)
            </span>
          </div>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <div className="flex items-center space-x-2 mb-4">
            {product.tags.map((tag, index) => (
              <span
                key={index}
                className="inline-block bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="flex space-x-2 mt-2">
            <div className="w-5 h-5 rounded-full bg-red-500"></div>
            <div className="w-5 h-5 rounded-full bg-yellow-500"></div>
            <div className="w-5 h-5 rounded-full bg-green-500"></div>
            <div className="w-5 h-5 rounded-full bg-black"></div>
            <div className="w-5 h-5 rounded-full bg-gray-500"></div>
          </div>
          <div className="mt-6">
            <div className="flex items-center mb-4">
              <span className="text-gray-700">Quantity</span>
              <div className="flex items-center mx-4">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className="px-2 py-1 border rounded-l"
                >
                  -
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={handleQuantityInputChange}
                  className="w-12 text-center border-t border-b"
                  min="1"
                  max={product.stock}
                />
                <button
                  onClick={() => handleQuantityChange(1)}
                  className="px-2 py-1 border rounded-r"
                >
                  +
                </button>
              </div>
              <span className="text-gray-600">
                {product.stock} pieces available
              </span>
            </div>
            <div className="flex space-x-4">
              <button className="flex items-center space-x-2 px-4 py-2 border border-red-500 text-red-500 rounded">
                <CiShoppingCart size={24} />
                <span>Add to Cart</span>
              </button>
              <button className="px-4 py-2 bg-red-500 text-white rounded">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <h2 className="text-2xl font-bold mb-2">Reviews</h2>
        {product.reviews.map((review, index) => (
          <div key={index} className="border-b py-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={`text-yellow-500 ${
                    review.rating > i ? "text-yellow-500" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <p className="text-gray-600 mt-2">{review.comment}</p>
            <p className="text-gray-400 text-sm">{review.reviewerName}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductDetail;
