// src/pages/HomePage.js
import React from "react";
import Header from "../components/Header";
import Home from "../components/Home";
import Footer from "../components/Footer";

function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Home />
      <Footer />
    </div>
  );
}

export default HomePage;
