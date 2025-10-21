import React, { useState } from "react";
import axios from "axios";

// Replace this with your Elastic Beanstalk URL
const API_URL = "http://your-elasticbeanstalk-url.amazonaws.com";

function App() {
  const [form, setForm] = useState({ name: "", age: "", course: "" });
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // Handle input change for form
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add student
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`${API_URL}/students`, form);
    setForm({ name: "", age: "", course: "" });
    alert("Student added successfully!");
  };

  // Handle search input
  const handleSearch = async (e) => {
    setSearch(e.target.value);
    if (e.target.value.trim() === "") {
      setSearchResults([]);
      return;
    }

    const res = await axios.get(`${API_URL}/students?name=${e.target.value}`);
    setSearchResults(res.data);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>Student Info Manager</h2>

      {/* Add student form */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
          style={{ marginRight: "10px", padding: "5px" }}
        />
        <input
          name="age"
          placeholder="Age"
          type="number"
          value={form.age}
          onChange={handleChange}
          required
          style={{ marginRight: "10px", padding: "5px" }}
        />
        <input
          name="course"
          placeholder="Course"
          value={form.course}
          onChange={handleChange}
          required
          style={{ marginRight: "10px", padding: "5px" }}
        />
        <button type="submit" style={{ padding: "5px 10px" }}>Add Student</button>
      </form>

      {/* Search */}
      <input
        placeholder="Search by name..."
        value={search}
        onChange={handleSearch}
        style={{ marginBottom: "20px", padding: "5px" }}
      />

      {/* Display search results only */}
      {searchResults.length > 0 && (
        <>
          <h3>Search Results</h3>
          <ul>
            {searchResults.map((s) => (
              <li key={s._id}>
                {s.name} - {s.age} - {s.course}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default App;
