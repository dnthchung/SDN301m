import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import "./App.scss";

import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import Header from "./components/Header";
import NotFoundPage from "./pages/NotFoundPage";
import ProductDetail from "./pages/ProductDetail";

import LoginPage from "./pages/LoginPage";
import Register from "./pages/Register";

import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./pages/admin/Dashboard";
import AddProduct from "./pages/admin/AddProduct";
import ProductForm from "./pages/admin/ProductForm";

import instance from "./axios/index";
import { set } from "react-hook-form";

function App() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  //fetch data from backend / api
  useEffect(() => {
    (async () => {
      try {
        const { data } = await instance.get("/products");
        // console.log(data);
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage dataTrans={products} />} />
          <Route path="/home" element={<Navigate to="/" />} />
          <Route path="/about" element={<AboutPage />} />

          {/* roduct detail */}
          <Route path="/product-detail/:id" element={<ProductDetail />} />
          <Route path="*" element={<NotFoundPage />} />

          {/* auth */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />

          {/* Dashboard - Private admin */}
          <Route path="/admin" element={<PrivateRoute />}>
            <Route path="/admin/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </main>
    </>
  );
}

export default App;
