import React, { useEffect, useState } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function EmployeeList() {
  const { dept } = useParams();
  const location = useLocation();
  const [employees, setEmployees] = useState([]);
  const departmentName = location.state?.departmentName || "Unknown Department";

  useEffect(() => {
    // Fetch employees by department ID
    fetch(`http://localhost:9999/employees/${dept}`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setEmployees(data);
      })
      .catch((error) => console.error("Error fetching employees:", error));
  }, [dept]);

  return (
    <div className="container mt-5">
      <Link to="/" className="btn btn-primary mb-3">
        Home Page
      </Link>
      <h1 className="mb-4">List of Employees</h1>
      <h3>Department: {departmentName}</h3>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Id</th>
            <th>Employee Name</th>
            <th>Date of Birth</th>
            <th>Gender</th>
            <th>Position</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee._id}>
              <td>{employee._id}</td>
              <td>{employee.name}</td>
              <td>{employee.dob}</td>
              <td>{employee.gender}</td>
              <td>{employee.position}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeList;
