import React, { useEffect, useState } from "react";
import { Card, Container, Row, Col, Form } from "react-bootstrap";

function App() {
  const [tutorials, setTutorials] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    fetch("http://localhost:9999/tutorials")
      .then((response) => response.json())
      .then((data) => setTutorials(data))
      .catch((error) => console.error("Error fetching tutorials:", error));

    fetch("http://localhost:9999/categories")
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  const filteredTutorials = selectedCategory
    ? tutorials.filter(
        (tutorial) => tutorial.category?._id === selectedCategory
      )
    : tutorials;

  return (
    <Container>
      <h1 className="text-center my-4">Tutorial Online Courses</h1>

      {/* Dropdown for categories */}
      <div className="mb-4" style={{ maxWidth: "300px", margin: "0 auto" }}>
        <Form.Group controlId="categorySelect">
          <Form.Label>Filter by Category:</Form.Label>
          <Form.Control
            as="select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
      </div>

      <Row>
        {filteredTutorials.map((tutorial) => (
          <Col key={tutorial._id} xs={12} sm={6} md={4} lg={3} className="mb-4">
            <Card>
              <Card.Img
                variant="top"
                src="https://via.placeholder.com/150"
                alt="Tutorial Thumbnail"
              />
              <Card.Body>
                <Card.Title>{tutorial.title}</Card.Title>
                <Card.Text>
                  <strong>Author:</strong> {tutorial.author} <br />
                  <strong>Category:</strong>{" "}
                  {tutorial.category?.name || "No category"}
                </Card.Text>
                <a href="#" className="text-decoration-none">
                  Comments: {tutorial.comments.length}
                </a>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default App;
