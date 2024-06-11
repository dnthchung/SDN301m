import React from "react";
import PromoSection from "../components/PromoSection";
import Banner from "../components/Banner";
import SaleBanner from "../components/BannerSale";

const HomePage = ({ dataTrans, dataTrans2 }) => {
  return (
    <div>
      <PromoSection />
      <Banner />
      <SaleBanner />
      <div className="bg-gray-200 min-h-screen p-8">
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Categories</h2>
          <div className="flex space-x-4">
            {dataTrans2.map((category) => (
              <div
                key={category.id}
                className="flex-shrink-0 w-20 h-40 bg-gray-800 rounded-lg flex items-center justify-center"
              >
                <img
                  src={category.image}
                  alt="Category"
                  className="w-16 h-16"
                />
                <p className="text-white text-xs text-center mt-2">
                  {category.name}
                </p>
              </div>
            ))}
          </div>
        </section>
        <section>
          <h2 className="text-2xl font-bold mb-4">Trending Products</h2>
          <div className="flex space-x-4 overflow-x-auto">
            {dataTrans.map((product) => (
              <div
                key={product.id}
                className="w-40 bg-white rounded-lg shadow-md p-4"
              >
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="w-full h-40 object-cover"
                />
                <h3 className="mt-2 text-gray-900 text-sm">{product.title}</h3>
                <p className="mt-1 text-gray-600">{`$${product.price.toFixed(
                  2
                )}`}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
