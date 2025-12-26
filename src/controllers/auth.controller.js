import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { pool } from "../config/db.js";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/jwt.js";

/**
 * REGISTER USER
 */
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into database
    const result = await pool.query(
      "INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, 'USER') RETURNING id, name, email, role",
      [name, email, hashedPassword]
    );

    // Return success
    res.status(201).json({
      message: "User registered successfully",
      user: result.rows[0],
    });
  } catch (error) {
    console.error("REGISTER ERROR:", error.message);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

/**
 * LOGIN USER / ADMIN
 */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Hardcoded admin login
    if (email === "admin" && password === "admin123") {
      const token = jwt.sign({ role: "ADMIN" }, JWT_SECRET, { expiresIn: "2h" });
      return res.status(200).json({ token, role: "ADMIN" });
    }

    // Find user in DB
    const result = await pool.query("SELECT * FROM users WHERE email=$1", [email]);
    if (!result.rows.length) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const user = result.rows[0];

    // Compare password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user.id, role: user.role },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    res.status(200).json({ token, role: user.role });
  } catch (error) {
    console.error("LOGIN ERROR:", error.message);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};
