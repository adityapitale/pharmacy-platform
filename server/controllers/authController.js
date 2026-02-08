const bcrypt = require("bcrypt");
const { Pool } = require("pg");
require("dotenv").config();

// DB connection
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  ssl: { rejectUnauthorized: false },
});

// REGISTER USER
exports.register = async (req, res) => {
  try {
    const { name, email, password, isPharmacist } = req.body;

    // check if exists
    const existing = await pool.query(
      "SELECT * FROM users WHERE email=$1",
      [email]
    );

    if (existing.rows.length > 0) {
      return res.json({ success: false, message: "User already exists" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // insert
    await pool.query(
      `INSERT INTO users (name, email, password, is_pharmacist)
       VALUES ($1,$2,$3,$4)`,
      [name, email, hashedPassword, isPharmacist]
    );

    res.json({ success: true });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await pool.query(
      "SELECT * FROM users WHERE email=$1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.json({ success: false, message: "Invalid email or password" });
    }

    const user = result.rows[0];

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.json({ success: false, message: "Invalid email or password" });
    }

    res.json({
      success: true,
      user: {
        name: user.name,
        email: user.email,
        role: "PHARMACIST",
      },
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
