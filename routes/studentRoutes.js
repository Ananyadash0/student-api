const express = require("express");
const pool = require("../config/db");

const router = express.Router();
router.get("/students", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM students ORDER BY id"
    );

    res.json(result.rows);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch students",
    });
  }
});

// Get student by ID
router.get("/students/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    const result = await pool.query(
      "SELECT * FROM students WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch student",
    });
  }
});

// Add student
router.post("/students", async (req, res) => {
  try {
    const { name, course } = req.body;

    const result = await pool.query(
      "INSERT INTO students (name, course) VALUES ($1, $2) RETURNING *",
      [name, course]
    );

    res.status(201).json({
      message: "Student added successfully",
      student: result.rows[0],
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to add student",
    });
  }
});

// Update student
router.put("/students/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { name, course } = req.body;

    const result = await pool.query(
      "UPDATE students SET name = $1, course = $2 WHERE id = $3 RETURNING *",
      [name, course, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    res.json({
      message: "Student updated successfully",
      student: result.rows[0],
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update student",
    });
  }
});

// Delete student
router.delete("/students/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    const result = await pool.query(
      "DELETE FROM students WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    res.json({
      message: "Student deleted successfully",
      student: result.rows[0],
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to delete student",
    });
  }
});

module.exports = router;