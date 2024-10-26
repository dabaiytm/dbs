import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import bodyParser from "body-parser";
import cors from "cors";
import mysql from "mysql2";


const app = express();
app.use(bodyParser.json());
app.use(cors({
  origin: "http://localhost:5173", // Allow requests only from this origin
  methods: ["GET", "POST"], // Allowed HTTP methods
  credentials: false, // Include cookies in requests (if needed)
}));

// User Registration Endpoint
app.post("/api/register", (req, res) => {
  const { username, password } = req.body;

  // Hash the password
  const hashedPassword = bcrypt.hashSync(password, 8);

  // Insert new user into the database
  pool.query('INSERT INTO User (Username, PasswordHash) VALUES (?, ?)', [username, hashedPassword], (err) => {
    if (err) return res.status(500).json({ error: "Database error" });
    return res.status(201).json({ message: "User registered successfully!" });
  });
});

app.get("/api/users", (req, res) => {
  pool.query('SELECT * FROM User', (err, results) => {
    if (err) {
      console.error('Error fetching users:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results); // Send back the results as JSON
  });
}); 

  

// Local MySQL Connection Pool
const pool = mysql.createPool({
  host: 'localhost',          // Use '127.0.0.1' if 'localhost' doesn’t work
  user: 'user', // Update with your local MySQL username
  password: 'user', // Update with your local MySQL password
  database: 'gym_management', // Update with your local database name
  port: 3306,                 // Default MySQL port
});

// Example function to query the database
const getUserByUsername = (username, callback) => {
  pool.query('SELECT * FROM User WHERE Username = ?', [username], (err, results) => {
    if (err) return callback(err);
    return callback(null, results[0]);
  });
};

const SECRET_KEY = "mysecretkey";

// Login endpoint
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  getUserByUsername(username, (err, user) => {
    console.log(err)
    console.log(user)
    if (err) return res.status(500).json({ error: "Database error" });
    if (!user) return res.status(401).json({ error: "Invalid username or password" });


    const isPasswordValid = bcrypt.compareSync(password, user.PasswordHash);
    console.log(password)
    console.log("hehe")

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const token = jwt.sign({ username: user.username }, SECRET_KEY, { expiresIn: "1h" });
    console.log("80")
    return res.json({ token });
  });
});

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the API!');
});

app.listen(5001, () => {
  console.log("Server is running on http://localhost:5001");
});
