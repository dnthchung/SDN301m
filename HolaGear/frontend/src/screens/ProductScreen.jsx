import React from "react";
import { useParams } from "react-router-dom";
import products from "../products";

const ProductScreen = () => {
  //rename id to productId
  const { id: productId } = useParams();
  const product = products.find((p) => p._id === productId);
  console.log(product);

  return <div>ProductScreen</div>;
};

export default ProductScreen;
