require("dotenv").config();

// Load packages
const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

// Create express app
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes"); 

// PostgreSQL connection
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  ssl: { rejectUnauthorized: false },
});

// Test DB connection
pool.connect()
  .then(() => console.log("✅ PostgreSQL Connected"))
  .catch((err) => console.error("❌ DB connection error:", err));

// Test route
app.get("/", (req, res) => {
  res.send("API Running 🚀");
});

app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);

// Start server
app.listen(5000, () => {
  console.log("🚀 Server running on port 5000");
});
