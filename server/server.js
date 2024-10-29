import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import bodyParser from "body-parser";
import cors from "cors";
import mysql from "mysql2";

<<<<<<< Updated upstream
=======
// Local MySQL Connection Pool
const pool = mysql.createPool({
  host: 'localhost',          // Use '127.0.0.1' if 'localhost' doesn’t work
  user: 'root', // Update with your local MySQL username
  password: 'yaotianming', // Update with your local MySQL password
  database: 'gym_management', // Update with your local database name
  port: 3306,                 // Default MySQL port
});


>>>>>>> Stashed changes
const app = express();
app.use(bodyParser.json());
app.use(cors());

<<<<<<< Updated upstream
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'yaotianming',
  database: 'gym_management',
  port:3306,
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the local MySQL database');
  connection.release(); // Release the connection after the check
});

// Define root route
app.get("/", (req, res) => {
  res.send("Welcome to the API!");
});

=======


// User Registration Endpoint
app.post("/api/register", (req, res) => {
  const { username, password } = req.body;

  // Check if the username or password is missing
  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required" });
  }

  // Insert the plain password into the database
  pool.query(
    'INSERT INTO User (Username, PasswordHash) VALUES (?, ?)', 
    [username, password],  // Store the plain password
    (err) => {
      if (err) {
        console.error("Database error during registration:", err);
        return res.status(500).json({ error: "Database error" });
      }
      return res.status(201).json({ message: "User registered successfully!" });
    }
  );
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

//get member
app.get("/api/members", (req, res) => {
  pool.query('SELECT * FROM Members', (err, results) => {
    if (err) {
      console.error('Error fetching users:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results); // Send back the results as JSON
  });
}); 

//get staff
app.get("/api/staff", (req, res) => {
  pool.query("SELECT * FROM Staff", (err, results) => {
    if (err) {
      console.error("Error fetching staff:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
});

//get equipment
app.get("/api/equipment", (req, res) => {
  pool.query("SELECT * FROM Equipment", (err, results) => {
    if (err) {
      console.error("Error fetching equipment:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
});

//get classes
app.get("/api/classes", (req, res) => {
  pool.query("SELECT * FROM Clasess", (err, results) => {
    if (err) {
      console.error("Error fetching classes:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
});

//get retail sales
app.get("/api/retailSale", (req, res) => {
  pool.query("SELECT * FROM Retail_Sales", (err, results) => {
    if (err) {
      console.error("Error fetching retailsales:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
});

//get trainers
app.get("/api/trainer", (req, res) => {
  pool.query("SELECT * FROM Trainer", (err, results) => {
    if (err) {
      console.error("Error fetching trainer:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
});


app.get("/api/members/:id", (req, res) => {
  const { id } = req.params;
  pool.query("SELECT * FROM Members WHERE MemID = ?", [id], (err, results) => {
    if (err) {
      console.error("Error fetching member:", err);
      return res.status(500).json({ error: "Database error" });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "Member not found" });
    }
    res.json(results[0]);
  });
});

// Add a new member
app.post("/api/members", (req, res) => {
  const {
    MemID,
    Fname,
    Lname,
    DOB,
    Email,
    Addr,
    Cell,
    JoinDate,
    Status,
    ERcontact,
    FitnessGoal,
    LockerID,
  } = req.body;

  pool.query(
    "INSERT INTO Members (MemID, Fname, Lname, DOB, Email, Addr, Cell, JoinDate, Status, ERcontact, FitnessGoal, LockerID) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [MemID, Fname, Lname, DOB, Email, Addr, Cell, JoinDate, Status, ERcontact, FitnessGoal, LockerID],
    (err) => {
      if (err) {
        console.error("Error adding member:", err);
        return res.status(500).json({ error: "Database error" });
      }
      res.status(201).json({ message: "Member added successfully!" });
    }
  );
});


// Example function to query the database
>>>>>>> Stashed changes
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

<<<<<<< Updated upstream
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

=======
>>>>>>> Stashed changes
// Login endpoint
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  getUserByUsername(username, (err, user) => {
    if (err) {
<<<<<<< Updated upstream
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
=======
      console.error("Database error:", err);
      return res.status(500).json({ error: "Database error" });
    }

    // Check if user exists
    if (!user) {
      console.log("User not found:", username);
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // Log entered and stored passwords
    console.log(`Entered password: ${password}`);
    console.log(`Stored password: ${user.PasswordHash}`);

    // Direct string comparison
    if (password !== user.PasswordHash) {
      console.log("Password mismatch for user:", username);
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // Generate a JWT token if the password matches
    const token = jwt.sign({ username: user.Username }, "mysecretkey", { expiresIn: "1h" });
    return res.json({ token });
  });
});


// Update an existing member
app.put("/api/members/:id", (req, res) => {
  const { id } = req.params;
  const {
    Fname,
    Lname,
    DOB,
    Email,
    Addr,
    Cell,
    JoinDate,
    Status,
    ERcontact,
    FitnessGoal,
    LockerID,
  } = req.body;

  pool.query(
    "UPDATE Members SET Fname = ?, Lname = ?, DOB = ?, Email = ?, Addr = ?, Cell = ?, JoinDate = ?, Status = ?, ERcontact = ?, FitnessGoal = ?, LockerID = ? WHERE MemID = ?",
    [Fname, Lname, DOB, Email, Addr, Cell, JoinDate, Status, ERcontact, FitnessGoal, LockerID, id],
    (err) => {
      if (err) {
        console.error("Error updating member:", err);
        return res.status(500).json({ error: "Database error" });
      }
      res.json({ message: "Member updated successfully!" });
    }
  );
});


// Delete a member
app.delete("/api/members/:id", (req, res) => {
  const { id } = req.params;
  pool.query("DELETE FROM Members WHERE MemID = ?", [id], (err) => {
>>>>>>> Stashed changes
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
