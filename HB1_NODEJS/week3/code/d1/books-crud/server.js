const express = require("express");
const app = express();

app.use(express.json());

let books = [
  { id: 1, title: "hihi", author: "utf8", year: 2008 },
  { id: 2, title: "olala", author: "huhu", year: 1999 },
];

let nextId = 3;

app.get("/api/books", (req, res) => {
  res.json({
    status: "success",
    data: books,
  });
});

app.get("/api/books/:id", (req, res) => {
  const id = Number(req.params.id);
  const book = books.find((b) => b.id === id);

  if (!book) {
    return res.status(404).json({
      status: "error",
      message: "Book not found",
    });
  }

  res.json({
    status: "success",
    data: book,
  });
});

app.post("/api/books", (req, res) => {
  const { title, author, year } = req.body;

  if (!title || !author) {
    return res.status(400).json({
      status: "error",
      message: "Title and author are required",
    });
  }

  const newBook = {
    id: nextId++,
    title,
    author,
    year: year || null,
  };

  books.push(newBook);

  res.status(201).json({
    status: "success",
    data: newBook,
  });
});

app.put("/api/books/:id", (req, res) => {
  const id = Number(req.params.id);
  const { title, author, year } = req.body;

  const index = books.findIndex((b) => b.id === id);

  if (index === -1) {
    return res.status(404).json({
      status: "error",
      message: "Book not found",
    });
  }

  if (!title || !author) {
    return res.status(400).json({
      status: "error",
      message: "Title and author are required",
    });
  }

  // Ghi đè toàn bộ
  books[index] = {
    id,
    title,
    author,
    year: year || null,
  };

  res.json({
    status: "success",
    data: books[index],
  });
});

app.patch("/api/books/:id", (req, res) => {
  const id = Number(req.params.id);
  const { title, author, year } = req.body;

  const book = books.find((b) => b.id === id);

  if (!book) {
    return res.status(404).json({
      status: "error",
      message: "Book not found",
    });
  }

  if (title !== undefined) book.title = title;
  if (author !== undefined) book.author = author;
  if (year !== undefined) book.year = year;

  res.json({
    status: "success",
    data: book,
  });
});

app.delete("/api/books/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = books.findIndex((b) => b.id === id);

  if (index === -1) {
    return res.status(404).json({
      status: "error",
      message: "Book not found",
    });
  }

  const deletedBook = books[index];
  books.splice(index, 1);

  res.json({
    status: "success",
    message: "Book deleted",
    data: deletedBook,
  });
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
