import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Table, Container, Button } from "react-bootstrap";

function CommentsPage() {
  const { id } = useParams(); // Get tutorial ID from the URL
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // Fetch comments for the specific tutorial
    fetch(`http://localhost:9999/tutorials/${id}/comments`)
      .then((response) => response.json())
      .then((data) => setComments(data))
      .catch((error) => console.error("Error fetching comments:", error));
  }, [id]);

  return (
    <Container className="mt-4">
      <h1 className="text-center mb-3">Tutorial Online Courses</h1>
      <Link to="/">Home pages</Link>
      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>Id</th>
            <th>Username</th>
            <th>Text</th>
            <th>Create At</th>
          </tr>
        </thead>
        <tbody>
          {comments.map((comment) => (
            <tr key={comment._id}>
              <td>{comment._id}</td>
              <td>{comment.username}</td>
              <td>{comment.text}</td>
              <td>{new Date(comment.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default CommentsPage;
