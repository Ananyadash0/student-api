require("dotenv").config();

const express = require("express");
const cors = require("cors");
const studentRoutes = require("./routes/studentRoutes");
const app = express();

const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use("/api", studentRoutes);

// Home route
app.get("/", (req, res) => {
    res.json({
        message: "Student API is running!"
    });
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});