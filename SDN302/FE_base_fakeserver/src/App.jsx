import { useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Home from "./pages/home";

function App() {
  return (
    <>
      <main>
        <Routes>
          <Route path="/home" element={<Home />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
