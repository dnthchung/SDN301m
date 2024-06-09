import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import instance from "../axios/index";
import { FaRegStar, FaStar, FaStarHalf } from "react-icons/fa";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});

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

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<FaStar key={i} className="text-yellow-500" />);
      } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
        stars.push(<FaStarHalf key={i} className="text-yellow-500" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-yellow-500" />);
      }
    }
    return stars;
  };

  const addToCart = () => {
    // Add to cart logic here
    console.log("Product added to cart:", product);
  };

  const saveToFavorites = () => {
    // Save to favorites logic here
    console.log("Product saved to favorites:", product);
  };

  return (
    <div className="mt-20 max-w-4xl mx-auto p-6 bg-white rounded shadow-md">
      {product.thumbnail && (
        <div className="flex flex-col lg:flex-row items-center lg:items-start">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full lg:w-1/3 h-72 object-cover rounded-lg shadow-lg mb-4 lg:mb-0 lg:mr-6"
          />
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
            <p className="text-gray-700 mb-4">{product.description}</p>
            <p className="text-2xl font-semibold text-green-600 mb-4">
              ${product.price}
            </p>
            <p className="text-gray-600 mb-2">Category: {product.category}</p>
            <p className="text-gray-600 mb-2">Brand: {product.brand}</p>
            <p className="text-gray-600 mb-2">Stock: {product.stock}</p>
            <div className="flex items-center mb-2">
              {renderStars(product.rating)}
              <span className="ml-2 text-yellow-500">{product.rating}</span>
            </div>
            <p className="text-red-600 mb-4">{product.availabilityStatus}</p>
            <p className="text-gray-600 mb-2">SKU: {product.sku}</p>
            <p className="text-gray-600 mb-2">
              Warranty: {product.warrantyInformation}
            </p>
            <p className="text-gray-600 mb-2">
              Shipping: {product.shippingInformation}
            </p>
            <p className="text-gray-600 mb-2">
              Return Policy: {product.returnPolicy}
            </p>
            <div className="flex space-x-4 mt-4">
              <button
                onClick={addToCart}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Add to Cart
              </button>
              <button
                onClick={saveToFavorites}
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
              >
                Save to Favorites
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="mt-6">
        <h2 className="text-2xl font-semibold mb-4">Customer Reviews</h2>
        <ul>
          {product.reviews && product.reviews.length > 0 ? (
            product.reviews.map((review, index) => (
              <li key={index} className="border-b py-4">
                <p className="font-semibold">{review.reviewerName}</p>
                <div className="flex items-center mb-2">
                  {renderStars(review.rating)}
                  <span className="ml-2 text-yellow-500">{review.rating}</span>
                </div>
                <p className="text-gray-700 mb-2">{review.comment}</p>
                <p className="text-gray-500 text-sm">
                  {new Date(review.date).toLocaleDateString()}
                </p>
              </li>
            ))
          ) : (
            <p>No reviews available.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ProductDetail;
