// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// -----------------------------
// Connect to MongoDB
// Replace with your MongoDB URL if using Atlas
mongoose.connect("mongodb://127.0.0.1:27017/studentDB");

// Schema
const studentSchema = new mongoose.Schema({
  name: String,
  age: Number,
  course: String,
});

const Student = mongoose.model("Student", studentSchema);

// -----------------------------
// Routes

// Insert student
app.post("/students", async (req, res) => {
  const student = new Student(req.body);
  await student.save();
  res.send(student);
});

// Get students, optionally filter by name
app.get("/students", async (req, res) => {
  const { name } = req.query; // optional ?name=XYZ
  let students;
  if (name) {
    students = await Student.find({ name: { $regex: name, $options: "i" } }); // case-insensitive
  } else {
    students = await Student.find();
  }
  res.send(students);
});

// -----------------------------
app.listen(5000, () => console.log("Server running on http://localhost:5000"));
