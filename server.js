// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// -----------------------------
// Connect to MongoDB Atlas
const mongoURI = "mongodb+srv://sahilgadhi6762_db_user:Sahil6762@merncluster.jywlfmk.mongodb.net/studentDB?retryWrites=true&w=majority";

mongoose.connect(mongoURI) // no deprecated options
  .then(() => console.log("✅ MongoDB Atlas connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Optional: check connection state at any time
mongoose.connection.on('connected', () => {
  console.log("Mongoose connection state: connected");
});
mongoose.connection.on('error', (err) => {
  console.log("Mongoose connection state: error", err);
});

// -----------------------------
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
  try {
    const student = new Student(req.body);
    await student.save();
    res.send(student);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Get students, optionally filter by name
app.get("/students", async (req, res) => {
  try {
    const { name } = req.query; // optional ?name=XYZ
    let students;
    if (name) {
      students = await Student.find({ name: { $regex: name, $options: "i" } });
    } else {
      students = await Student.find();
    }
    res.send(students);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// -----------------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
