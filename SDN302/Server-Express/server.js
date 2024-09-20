const express = require("express");
const server = express();
const port = 9000;
const hostname = "localhost";

// Middleware to parse JSON bodies
server.use(express.json());

// Fake database for students
let data = [
  { code: "SV01", name: "Nguyen Van A", mark: 8 },
  { code: "SV02", name: "Nguyen Van B", mark: 5 },
  { code: "SV03", name: "Nguyen Van C", mark: 7 },
];

// Input validation middleware
function checkInput(req, res, next) {
  const { code, name, mark } = req.body;

  // Check for empty inputs
  if (!code || !name || mark === undefined) {
    // return res.status(400).send({ message: "Code, name, and mark are required" });
    next("Code, name, and mark are required");
  }

  // Check if code, name, and mark are trimmed and not empty
  if (!code.trim() || !name.trim()) {
    return res.status(400).send({ message: "Code and name cannot be empty" });
    // next("Code and name cannot be empty");
  }

  // Check if the code is duplicated
  if (data.find((student) => student.code === code)) {
    return res.status(400).send({ message: "Code is duplicated" });
  }

  // Check if the mark is a valid number between 0 and 10
  if (isNaN(mark) || mark < 0 || mark > 10) {
    return res.status(400).send({ message: "Mark must be a number between 0 and 10" });
  }

  // Proceed to the next middleware or route handler if everything is valid
  next();
}

server.use((err, req, res, next) => {
  console.log(err);
  //   res.status(404).send("hi hi " + { err });
});

// GET /students: Fetch all students
server.get("/students", (req, res) => {
  res.send(data);
});

// POST /students: Add a new student with input validation
server.post("/students", checkInput, (req, res) => {
  const sv = req.body;
  data.push(sv);
  res.send(data);
});

// GET /students/:id: Search student by code
server.get("/students/:id", (req, res) => {
  const studentCode = req.params.id;
  const student = data.find((sv) => sv.code === studentCode);
  if (student) {
    res.send(student);
  } else {
    res.status(404).send({ message: "Student not found" });
  }
});

// PUT /students: Update a student by code
server.put("/students", (req, res) => {
  const updatedStudent = req.body;
  const index = data.findIndex((sv) => sv.code === updatedStudent.code);
  if (index !== -1) {
    data[index] = updatedStudent;
    res.send(data);
  } else {
    res.status(404).send({ message: "Student not found" });
  }
});

// DELETE /students: Delete a student by code
server.delete("/students", (req, res) => {
  const studentCode = req.body.code;
  const index = data.findIndex((sv) => sv.code === studentCode);
  if (index !== -1) {
    data.splice(index, 1);
    res.send(data);
  } else {
    res.status(404).send({ message: "Student not found" });
  }
});

// Start server
server.listen(port, hostname, () => {
  console.log(`Server is running at http://${hostname}:${port}`);
});
