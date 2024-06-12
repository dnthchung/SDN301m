import React from "react";
import ProductCard from "../components/ProductCard";

const ProductList = ({ products, category }) => {
  const filteredProducts = products.filter((product) => product.category.toLowerCase() === category.toLowerCase());

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{category.charAt(0).toUpperCase() + category.slice(1)} Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
