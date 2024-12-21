import React, { useEffect, useState } from "react";
import { Card, Container, Row, Col, Form } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CommentsPage from "./CommentsPage";

function App() {
  const [tutorials, setTutorials] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    // Fetch tutorials
    fetch("http://localhost:9999/tutorials")
      .then((response) => response.json())
      .then((data) => setTutorials(data))
      .catch((error) => console.error("Error fetching tutorials:", error));

    // Fetch categories
    fetch("http://localhost:9999/categories")
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  const filteredTutorials = selectedCategory ? tutorials.filter((tutorial) => tutorial.category?._id === selectedCategory) : tutorials;

  return (
    <Router>
      <Routes>
        {/* Main Page */}
        <Route
          path="/"
          element={
            <Container>
              <h1 className="text-center my-4">Tutorial Online Courses</h1>

              {/* Link to home page */}
              <Link to="/">Home Page</Link>
              {/* Dropdown for categories */}
              <div className="my-4" style={{ maxWidth: "300px" }}>
                <Form.Group controlId="categorySelect">
                  <Form.Label>Filter by Category:</Form.Label>
                  <Form.Control as="select" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                    <option value="">All Categories</option>
                    {categories.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </div>

              {/* Display Tutorials */}
              <Row>
                {filteredTutorials.map((tutorial) => (
                  <Col key={tutorial._id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                    <Card className="h-100 d-flex flex-column">
                      <Card.Img
                        variant="top"
                        src={tutorial.images[0]?.url ? `/sites/${tutorial.images[0]?.url}` : "https://via.placeholder.com/150"}
                        alt="Tutorial Thumbnail"
                        style={{ objectFit: "cover", height: "150px" }}
                      />
                      <Card.Body className="d-flex flex-column">
                        <div>
                          <Card.Title>{tutorial.title}</Card.Title>
                          <Card.Text>
                            <strong>Author:</strong> {tutorial.author} <br />
                            <strong>Category:</strong> {tutorial.category?.name || "No category"}
                          </Card.Text>
                        </div>
                        <div className="my-auto text-center">
                          {/* Link to comments */}
                          <Link to={`/tutorials/${tutorial._id}/comments`} className="text-decoration-none">
                            Comments: {tutorial.comments.length}
                          </Link>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Container>
          }
        />
        {/* Comments Page */}
        <Route path="/tutorials/:id/comments" element={<CommentsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
