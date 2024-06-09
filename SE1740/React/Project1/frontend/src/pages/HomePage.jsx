import React from "react";
import { Link } from "react-router-dom";

function HomePage({ dataTrans }) {
  return (
    <div className="m-5">
      <h2 className="text-2xl font-bold mb-4">Home Page</h2>
      <p className="mb-4">Welcome to our home page!</p>
      <h3 className="text-xl font-semibold mb-4">Products list</h3>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {dataTrans.map((dataWillShow) => (
          <li className="border p-5 rounded shadow-md" key={dataWillShow.id}>
            <Link to={`/product-detail/${dataWillShow.id}`}>
              <img
                src={dataWillShow.thumbnail}
                alt={dataWillShow.title}
                className="w-full h-48 object-cover mb-4"
              />
            </Link>
            <h3 className="text-lg font-medium mb-2">{dataWillShow.title}</h3>
            <p className="mb-2">{dataWillShow.description}</p>
            <p className="text-green-600 font-semibold mb-2">
              ${dataWillShow.price}
            </p>
            <p className="text-gray-600 mb-2">
              Category: {dataWillShow.category}
            </p>
            <p className="text-gray-600 mb-2">Brand: {dataWillShow.brand}</p>
            <p className="text-gray-600 mb-2">Stock: {dataWillShow.stock}</p>
            <p className="text-yellow-500 mb-2">
              Rating: {dataWillShow.rating}
            </p>
            <p className="text-red-600">{dataWillShow.availabilityStatus}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;
