require("dotenv").config();

const express = require("express");
const { Pool } = require("pg");

const app = express();

const PORT = 3000;

// Middleware
app.use(express.json());

// PostgreSQL connection
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});

// Test database connection
pool.query("SELECT NOW()", (error, result) => {
    if (error) {
        console.error("Database connection failed:", error);
    } else {
        console.log("Database connected successfully!");
        console.log("Database time:", result.rows[0].now);
    }
});

// Home route
app.get("/", (req, res) => {
    res.json({
        message: "Student API is running!"
    });
});

// Get all students
app.get("/api/students", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM students ORDER BY id");

        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to fetch students"
        });
    }
});

app.get("/api/students/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);

        const result = await pool.query(
            "SELECT * FROM students WHERE id = $1",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        res.json(result.rows[0]);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to fetch student"
        });
    }
});

app.post("/api/students", async (req, res) => {
    try {
        const { name, course } = req.body;

        const result = await pool.query(
            "INSERT INTO students (name, course) VALUES ($1, $2) RETURNING *",
            [name, course]
        );

        res.status(201).json({
            message: "Student added successfully",
            student: result.rows[0]
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to add student"
        });
    }
});

app.put("/api/students/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        const { name, course } = req.body;

        const result = await pool.query(
            "UPDATE students SET name = $1, course = $2 WHERE id = $3 RETURNING *",
            [name, course, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        res.json({
            message: "Student updated successfully",
            student: result.rows[0]
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to update student"
        });
    }
});

app.delete("/api/students/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);

        const result = await pool.query(
            "DELETE FROM students WHERE id = $1 RETURNING *",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        res.json({
            message: "Student deleted successfully",
            student: result.rows[0]
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to delete student"
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});