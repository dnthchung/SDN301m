let books = [
  { id: 1, title: "hihi", author: "utf8", year: 2008 },
  { id: 2, title: "olala", author: "huhu", year: 1999 },
];
let nextId = 3;

const BookModel = {
  findAll: () => books,

  findById: (id) => books.find((b) => b.id === id),

  create: (data) => {
    const newBook = { id: nextId++, ...data, year: data.year ?? null };
    books.push(newBook);
    return newBook;
  },

  update: (id, data) => {
    const index = books.findIndex((b) => b.id === id);
    if (index === -1) return null;

    books[index] = { id, ...data, year: data.year ?? null };
    return books[index];
  },

  patch: (id, data) => {
    const book = books.find((b) => b.id === id);
    if (!book) return null;

    Object.assign(book, data);
    return book;
  },

  remove: (id) => {
    const index = books.findIndex((b) => b.id === id);
    if (index === -1) return null;

    const [deletedBook] = books.splice(index, 1);
    return deletedBook;
  },
};

export default BookModel;
