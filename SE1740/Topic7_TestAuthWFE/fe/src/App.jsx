import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import "./App.css";
import Header from "./components/main/Header";
import UserAuthForm from "./pages/user/UserAuthForm";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<div>Home Page</div>} />
        <Route path="/signin" element={<UserAuthForm myType="sign-in" />} />
        <Route path="/signup" element={<UserAuthForm myType="sign-up" />} />
      </Routes>
    </>
  );
}

export default App;
