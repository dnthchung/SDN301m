require("dotenv").config();

const config = require("./config.json");
const mongoose = require("mongoose");

mongoose.connect(config.connectionString);

//Api Create account step 2
const User = require("./models/user.model");
//Api Create note step 2
const Note = require("./models/note.model");

const express = require("express");
const cors = require("cors");
const app = express();

const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./utilities");

app.use(express.json());

app.use(
  cors({
    origin: "*", // restrict calls to those this address
  })
);

app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

// ===================== API =====================

//Api Create account step 1 :
app.post("/create-account", async (req, res) => {
  const { fullName, email, password } = req.body;

  if (!fullName) {
    return res
      .status(400)
      .json({ error: true, message: "Full name is required" });
  }

  if (!email) {
    return res.status(400).json({ error: true, message: "Email is required" });
  }

  if (!password) {
    return res
      .status(400)
      .json({ error: true, message: "Password is required" });
  }

  //check if email already exists
  const isUserExists = await User.findOne({ email });
  if (isUserExists) {
    return res
      .status(400)
      .json({ error: true, message: "Email(User) already exists" });
  }

  const user = new User({
    fullName,
    email,
    password,
  });
  await user.save();

  //1:16:39 . 1:19:06
  const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "30m",
  });

  return res.json({
    error: false,
    user,
    accessToken,
    message: "Account created successfully",
  });
});

//Api Login step 1 :
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({ error: true, message: "Email is required" });
  }

  if (!password) {
    return res
      .status(400)
      .json({ error: true, message: "Password is required" });
  }

  // const userInfo = await User.findOne({ email: email, password: password });
  const userInfo = await User.findOne({ email: email });

  if (!userInfo) {
    return res.status(400).json({ error: true, message: "User not found!" });
  }

  if (userInfo.email == email || userInfo.password == password) {
    const user = { user: userInfo };
    //1:20:45
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "30m",
    });

    return res.json({
      error: false,
      email,
      accessToken,
      message: "Login successful",
    });
  } else {
    return res
      .status(400)
      .json({ error: true, message: "Invalid email or password" });
  }
});

//Api get user
app.get("/get-user", authenticateToken, async (req, res) => {
  const { user } = req.user;

  const isUserExists = await User.find({ userId: user._id });
  console.log(user._id ? "not null" : "null`");
  console.log(user._id);

  if (!isUserExists) {
    return res.status(401).json({ error: true, message: "User not found!" });
  }

  //data trả về - cần phải custom thông tin cơ bản cần trả về của user tránh trả về thông tin nhạy cảm
  return res.json({
    error: false,
    user: {
      fullname: isUserExists.fullName,
      email: isUserExists.email,
      _id: isUserExists._id,
      createdOn: isUserExists.createdOn,
    },
    message: "Get User ok",
  });
});

//Api Create note step 1 :
app.post("/add-note", authenticateToken, async (req, res) => {
  const { title, content, tags } = req.body;
  const { user } = req.user;

  if (!title) {
    return res.status(400).json({ error: true, message: "Title is required" });
  }

  if (!content) {
    return res
      .status(400)
      .json({ error: true, message: "Content is required" });
  }

  try {
    const note = new Note({
      title,
      content,
      tags: tags || [],
      userId: user._id,
    });

    await note.save();

    return res.json({
      error: false,
      note,
      message: "Note created successfully",
    });
  } catch (err) {
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error", err, user: user });
  }
});

//api edit note step 1
app.put("/edit-note/:noteId", authenticateToken, async (req, res) => {
  const { title, content, tags, isPinned } = req.body;
  const nodeId = req.params.noteId;
  const { user } = req.user;

  if (!title && !content && !tags) {
    return res.status(400).json({ error: true, message: "no change provided" });
  }

  try {
    const note = await Note.findOne({ _id: nodeId, userId: user._id });
    if (!note) {
      return res.status(404).json({ error: true, message: "Note not found" });
    }

    if (title) note.title = title;
    if (content) note.content = content;
    if (tags) note.tags = tags;
    if (isPinned) note.isPinned = isPinned;

    await note.save();
    return res.json({
      error: false,
      note,
      message: "Note updated successfully",
    });
  } catch (err) {
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error", err });
  }
});

//get all notes
app.get("/get-all-notes", authenticateToken, async (req, res) => {
  const { user } = req.user;

  try {
    const notes = await Note.find({ userId: user._id }).sort({ isPinned: -1 });
    //.sort({isPinned: -1}) => sắp xếp theo thứ tự giảm dần của isPinned
    return res.json({
      error: false,
      notes,
      message: "All notes fetched successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Internal Server Error By get all notes",
      error,
    });
  }
});

//delete note
//localhost:8000/delete-note/60f3b3b3b3b3b3b3b3b3b3b3
app.delete("/delete-note/:noteId", authenticateToken, async (req, res) => {
  const noteId = req.params.noteId;
  const { user } = req.user;

  try {
    const note = await Note.findOne({ _id: noteId, userId: user._id });
    if (!note) {
      return res.status(404).json({ error: true, message: "Note not found" });
    }

    await Note.deleteOne({ _id: noteId, userId: user._id });

    return res.json({
      error: false,
      message: "Note deleted successfully",
    });
  } catch (err) {
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error when delete", err });
  }
});

//upadte isPinned value
//localhost:8000/pin-note/60f3b3b3b3b3b3b3b3b3b3
app.put("/update-note-pinned/:noteId", authenticateToken, async (req, res) => {
  const noteId = req.params.noteId;
  const { user } = req.user;
  const { isPinned } = req.body;

  try {
    const noteFound = await Note.findOne({ _id: noteId, userId: user._id });

    if (!noteFound) {
      return res.status(404).json({ error: true, message: "Note not found" });
    }

    //update isPinned value vì isPinned là giá trị boolean
    //nên không cần check giá trị của nó
    noteFound.isPinned = isPinned;

    await noteFound.save();

    return res.json({
      error: false,
      message: "Note pinned successfully",
    });
  } catch (err) {
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error when pin", err });
  }
});

app.listen(8000);

module.exports = app;
