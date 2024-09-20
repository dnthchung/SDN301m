const express = require("express");
const bodyParser = require("body-parser");
const users = require("./data");
const myServer = express();

myServer.use(bodyParser.json());

// 1. GET
myServer.get("/users", (req, res) => {
  const genderVerify = users.map((user) => ({
    ...user,
    gender: user.gender === 1 ? "Male" : "Female",
  }));
  res.json(genderVerify);
});

// 2. GET
myServer.get("/users/:account", (req, res) => {
  const accountIn = req.params.account;
  const userFound = users.find((u) => u.account === accountIn);
  if (!userFound) {
    return res.status(404).json({ message: "Account not exist", statusCode: 404 });
  }
  const genderVerify = { ...userFound, gender: userFound.gender === 1 ? "Male" : "Female" };
  res.json(genderVerify);
});

// 3. POST
myServer.post("/users", (req, res) => {
  const { account, name, gender, email, password } = req.body;
  //   console.log(req.body);
  // var unique account and email
  const userFound = users.find((u) => u.account === account || u.email === email);
  if (userFound) {
    return res.status(400).json({ message: "Account already exists" });
  }

  if (!account) {
    return res.status(400).json({ message: "null account" });
  }
  if (!name) {
    return res.status(400).json({ message: "null name" });
  }
  if (!gender && gender !== 0) {
    return res.status(400).json({
      message: "null gender",
    });
  }
  if (!email) {
    return res.status(400).json({ message: "null email" });
  }
  if (!password) {
    return res.status(400).json({ message: "null password" });
  }

  if (gender !== 0 && gender !== 1) {
    return res.status(400).json({ message: "Gender must be 0 or 1" });
  }

  if (!email.includes("@")) {
    return res.status(400).json({ message: "Email must be valid and contain '@'" });
  }

  const newUser = { account, name, gender, email, password };
  users.push(newUser);
  res.status(201).json(newUser);
});

// 4. PUT
myServer.put("/users/:account/:password", (req, res) => {
  const { account, password } = req.params;
  const { name, gender, email, newPassword } = req.body;

  // Check  account
  const userFound = users.find((u) => u.account === account);
  if (!userFound) {
    return res.status(404).json({ message: "Account not found", statusCode: 404 });
  }

  // Check  password
  if (userFound.password !== password) {
    return res.status(401).json({ message: "Password incorrect", statusCode: 401 });
  }

  if (name) userFound.name = name;
  if (gender === 0 || gender === 1) {
    userFound.gender = gender;
  } else {
    return res.status(400).json({ message: "Invalid gender", statusCode: 400 });
  }
  if (email && email.includes("@")) userFound.email = email;
  if (newPassword) userFound.password = newPassword;

  res.json(userFound);
});

// 5. DELETE
myServer.delete("/users/:account", (req, res) => {
  const userIn = req.params.account;

  // Check if users array is empty
  if (!users || users.length === 0) {
    return res.status(400).json({ message: "Data empty" });
  }

  const userIndex = users.findIndex((u) => u.account === userIn);
  if (userIndex === -1) {
    return res.status(404).json({ message: "Account does not exist" });
  }

  // Remove the user
  users.splice(userIndex, 1);
  res.status(200).json({ message: "Delete success" });
});

const PORT = 3000;
myServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} and http://localhost:${PORT}`);
});
