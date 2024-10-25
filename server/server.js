import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import bodyParser from "body-parser";
import cors from "cors";
import mysql from "mysql2";

const app = express();
app.use(bodyParser.json());
app.use(cors());

const pool = mysql.createPool({
  host: '34.139.116.78',
  user: 'dbsteam1',
  password: '20241231DBS',
  database: 'gym_management',
});

// Define root route
app.get("/", (req, res) => {
  res.send("Welcome to the API!");
});

const getUserByUsername = (username, callback) => {
  pool.query('SELECT * FROM Users WHERE username = ?', [username], (err, results) => {
    if (err) return callback(err);
    return callback(null, results[0]);
  });
};

const SECRET_KEY = "mysecretkey";

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Invalid token" });
    }
    req.user = user;
    next();
  });
};

// Login endpoint
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  getUserByUsername(username, (err, user) => {
    if (err) {
      console.error('Error querying the database:', err);
      return res.status(500).json({ error: "Database error" });
    }

    if (!user) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const trimmedPassword = password.trim();
    const trimmedStoredPassword = user.Password.trim();

    if (trimmedPassword === trimmedStoredPassword) {
      const token = jwt.sign({
        username: user.Username,
        userId: user.UserID
      }, SECRET_KEY, { expiresIn: "1h" });

      return res.json({
        token,
        user: {
          username: user.Username,
          role: user.Role
        }
      });
    } else {
      return res.status(401).json({ error: "Invalid username or password" });
    }
  });
});

// Protected route
app.get("/api/protected-route", authenticateToken, (req, res) => {
  // Get user data based on the authenticated user
  getUserByUsername(req.user.username, (err, user) => {
    if (err) {
      console.error('Error fetching user data:', err);
      return res.status(500).json({ error: "Database error" });
    }

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Return user data (excluding sensitive information)
    res.json({
      username: user.Username,
      role: user.Role,
      message: "Successfully authenticated"
    });
  });
});

// Start the server
app.listen(5001, () => {
  console.log("Server is running on http://localhost:5001");
});
