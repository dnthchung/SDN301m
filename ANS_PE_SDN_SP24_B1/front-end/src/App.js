import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import EmployeeList from "./EmployeeList";
import AddProject from "./AddProject";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/employees/:dept" element={<EmployeeList />} />
        <Route path="/projects/add" element={<AddProject />} />
      </Routes>
    </Router>
  );
}

export default App;
