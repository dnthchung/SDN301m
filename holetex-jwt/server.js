import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

//fake data to simulate a database
const books = [
  {
    id: 1,
    title: "Book 1",
    author: "Author 1",
  },
  {
    id: 2,
    title: "Book 2",
    author: "Author 2",
  },
];

app.get("/books", authenToken, (req, res) => {
  res.json({
    status: "success",
    data: books,
  });
});

//middleware
//check var token
function authenToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  //unauthorized error
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
    console.log(err, data);
    //forbidden error
    if (err) return res.sendStatus(403);
    // req.data = data;
    next();
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
