import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import bodyParser from "body-parser";
import cors from "cors";
import mysql from "mysql2";

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Google Cloud SQL Connection Pool
const pool = mysql.createPool({
  host: '34.139.116.78',  
  user: 'dbsteam1',
  password: '20241231DBS',
  database: 'gym_management',
});

//testing if the connection is good: 
pool.query('SELECT 1 + 1 AS solution', (err, results) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Database connected! The solution is:', results[0].solution);
  }
});

// Example function to query the database
const getUserByUsername = (username, callback) => {
  pool.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
    if (err) return callback(err);
    return callback(null, results[0]);
  });
};

const SECRET_KEY = "mysecretkey";

// Login endpoint
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  getUserByUsername(username, (err, user) => {
    if (err) return res.status(500).json({ error: "Database error" });
    if (!user) return res.status(401).json({ error: "Invalid username or password" });

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const token = jwt.sign({ username: user.username }, SECRET_KEY, { expiresIn: "1h" });
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
