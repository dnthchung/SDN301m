// Import model, phải có .js
import BookModel from "../models/book.model.js";

// Dùng export const cho từng hàm
export const getAllBooks = (req, res) => {
  const books = BookModel.findAll();
  res.json({ status: "success", data: books });
};

export const getBookById = (req, res) => {
  const id = Number(req.params.id);
  const book = BookModel.findById(id);

  if (!book) {
    return res.status(404).json({ status: "error", message: "Book not found" });
  }
  res.json({ status: "success", data: book });
};

export const createBook = (req, res) => {
  const newBook = BookModel.create(req.body);
  res.status(201).json({ status: "success", data: newBook });
};

export const updateBook = (req, res) => {
  const id = Number(req.params.id);
  const updatedBook = BookModel.update(id, req.body);

  if (!updatedBook) {
    return res.status(404).json({ status: "error", message: "Book not found" });
  }
  res.json({ status: "success", data: updatedBook });
};

export const patchBook = (req, res) => {
  const id = Number(req.params.id);
  const patchedBook = BookModel.patch(id, req.body);

  if (!patchedBook) {
    return res.status(404).json({ status: "error", message: "Book not found" });
  }
  res.json({ status: "success", data: patchedBook });
};

export const deleteBook = (req, res) => {
  const id = Number(req.params.id);
  const deletedBook = BookModel.remove(id);

  if (!deletedBook) {
    return res.status(404).json({ status: "error", message: "Book not found" });
  }
  res.json({ status: "success", message: "Book deleted", data: deletedBook });
};
