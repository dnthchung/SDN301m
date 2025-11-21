const express = require("express");
const router = express.Router();
const ApiError = require("../utils/ApiError");

let books = [
  { id: 1, title: "Book A", author: "Author A", year: 2000 },
  { id: 2, title: "Book B", author: "Author B", year: 2010 },
];

router.get("/", (req, res) => {
  res.json({
    success: true,
    data: books,
  });
});

router.get("/:id", (req, res, next) => {
  const id = Number(req.params.id);
  const book = books.find((b) => b.id === id);

  if (!book) {
    return next(new ApiError(404, 1001, "Book not found"));
  }

  res.json({
    success: true,
    data: book,
  });
});

router.post("/", (req, res, next) => {
  const { title, author, year } = req.body;

  if (!title || !author) {
    return next(new ApiError(400, 1002, "Title and author are required"));
  }

  const newBook = {
    id: books.length + 1,
    title,
    author,
    year: year || null,
  };

  books.push(newBook);

  res.status(201).json({
    success: true,
    data: newBook,
  });
});

// demo loiôx
router.get("/demo/error/internal", (req, res, next) => {
  throw new Error("Unexpected server error");
});

module.exports = router;
