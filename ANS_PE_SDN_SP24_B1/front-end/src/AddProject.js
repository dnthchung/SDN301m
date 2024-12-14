import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

function AddProject() {
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [type, setType] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [departments, setDepartments] = useState([]);
  const navigate = useNavigate();

  // Fetch departments for the dropdown
  useEffect(() => {
    fetch("http://localhost:9999/departments", {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch departments");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Departments fetched:", data);
        setDepartments(data);
      })
      .catch((error) => console.error("Error fetching departments:", error));
  }, []);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate required fields
    if (!projectName.trim()) {
      alert("Please enter the project name."); // Show alert
      return;
    }
    if (!departmentId) {
      alert("Please select a department."); // Show alert
      return;
    }

    const newProject = {
      name: projectName,
      description,
      startDate,
      type,
      department: departmentId,
    };

    // Submit to the backend
    fetch("http://localhost:9999/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProject),
    })
      .then((response) => {
        if (response.ok) {
          alert("Project added successfully!"); // Show success alert
          navigate("/"); // Redirect to home page
        } else {
          alert("Failed to add the project."); // Show failure alert
        }
      })
      .catch((error) => console.error("Error adding project:", error));
  };

  return (
    <div className="container mt-5">
      <Link to="/" className="btn btn-primary mb-3">
        Home Page
      </Link>
      <h1 className="mb-4">Add a New Project</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="projectName" className="form-label">
            Project Name *
          </label>
          <input
            type="text"
            id="projectName"
            className="form-control"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            id="description"
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="startDate" className="form-label">
            Start Date
          </label>
          <input
            type="date"
            id="startDate"
            className="form-control"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="type" className="form-label">
            Type
          </label>
          <input
            type="text"
            id="type"
            className="form-control"
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="departmentId" className="form-label">
            Department *
          </label>
          <select
            id="departmentId"
            className="form-control"
            value={departmentId}
            onChange={(e) => setDepartmentId(e.target.value)}
            required
          >
            <option value="">Select Department</option>
            {departments.map((dept) => (
              <option key={dept.id} value={dept.id}>
                {dept.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-success">
          Create
        </button>
      </form>
    </div>
  );
}

export default AddProject;
