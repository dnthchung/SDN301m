import React, { useState, useEffect, createContext } from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./App.css";
import Header from "./components/main/Header";
import UserAuthForm from "./pages/user/UserAuthForm";
import DashBoardUser from "./pages/admin/DashBoardUser";

export const UserContext = createContext({});

const App = () => {
  const [userAuth, setUserAuth] = useState({});

  useEffect(() => {
    const user = sessionStorage.getItem("user");
    const accessToken = sessionStorage.getItem("accessToken");
    if (user && accessToken) {
      setUserAuth({ accessToken: accessToken, user: JSON.parse(user) });
    } else {
      setUserAuth({ accessToken: null });
    }
  }, []);

  return (
    <UserContext.Provider value={{ userAuth, setUserAuth }}>
      <Toaster />
      <Header />
      <Routes>
        <Route path="/" element={<div>Home Page</div>} />
        <Route path="/signin" element={<UserAuthForm myType="sign-in" />} />
        <Route path="/signup" element={<UserAuthForm myType="sign-up" />} />
        <Route path="/dashboard" element={<DashBoardUser />} />
      </Routes>
    </UserContext.Provider>
  );
};

export default App;
