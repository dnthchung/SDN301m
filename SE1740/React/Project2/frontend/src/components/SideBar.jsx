import React from "react";

const SideBar = ({
  selectedColor,
  setSelectedColor,
  selectedPrice,
  setSelectedPrice,
  selectedBrand,
  setSelectedBrand,
  priceRange,
  setPriceRange,
}) => {
  const colors = [
    "#ff0000",
    "#ff5722",
    "#ffeb3b",
    "#4caf50",
    "#2196f3",
    "#000000",
    "#795548",
    "#e91e63",
    "#cddc39",
    "#9c27b0",
    "#00bcd4",
    "#607d8b",
  ];

  const brands = ["Adidas", "Nike", "Puma", "Gucci", "Dior", "Fila", "Vans", "Uniqlo", "Lacoste"];

  return (
    <div className="w-64 p-4">
      <div className="mb-4 mt-10">
        <h2 className="text-xl font-bold mb-2">Colors</h2>
        <div className="flex flex-wrap">
          {colors.map((color) => (
            <div
              key={color}
              className={`w-8 h-8 rounded-full mr-2 mb-2 cursor-pointer`}
              style={{ backgroundColor: color }}
              onClick={() => setSelectedColor(color)}
            ></div>
          ))}
        </div>
      </div>
      <hr className="p-3" />
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">Price</h2>
        <input
          type="number"
          placeholder="From"
          className="w-20 mr-2 p-1 border rounded"
          value={priceRange[0]}
          onChange={(e) => setPriceRange([e.target.value, priceRange[1]])}
        />
        <span className="m-4">~</span>
        <input
          type="number"
          placeholder="To"
          className="w-20 p-1 border rounded"
          value={priceRange[1]}
          onChange={(e) => setPriceRange([priceRange[0], e.target.value])}
        />
      </div>
      <hr className="p-3" />
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">Brand</h2>
        <div className="flex flex-wrap">
          {brands.map((brand) => (
            <button
              key={brand}
              className={`m-1 px-2 py-1 border rounded ${selectedBrand === brand ? "bg-gray-400" : "bg-white"}`}
              onClick={() => setSelectedBrand(brand)}
            >
              {brand}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
