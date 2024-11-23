import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import bodyParser from "body-parser";
import cors from "cors";
import mysql from "mysql2";

// Local MySQL Connection Pool
const pool = mysql.createPool({
  host: 'localhost',          // Use '127.0.0.1' if 'localhost' doesn’t work
  user: 'user', // Update with your local MySQL username
  password: 'user', // Update with your local MySQL password
  database: 'gym_management', // Update with your local database name
  port: 3306,                 // Default MySQL port
});


const app = express();
app.use(bodyParser.json());
app.use(cors({
  origin: "http://localhost:5173", // Allow requests only from this origin
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
  credentials: false, // Include cookies in requests (if needed)
}));

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

app.get("/api/members", (req, res) => {
  pool.query('SELECT * FROM Members', (err, results) => {
    if (err) {
      console.error('Error fetching users:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results); // Send back the results as JSON
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
    Cell,
    JoinDate,
    Status,
    FitnessGoal,
    LockerID,
    GymID,
    MembershipID,
    TrainerSSN,
    Street,
    City,
    State,
    Zipcode,
    ERContactName,
    ERContactPhone
  } = req.body;

  pool.query(
    "INSERT INTO Members (MemID, Fname, Lname, DOB, Email, Cell, JoinDate, Status, FitnessGoal, LockerID, GymID, MembershipID, TrainerSSN, Street, City, State, Zipcode, ERContactName, ERContactPhone) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [MemID, Fname, Lname, DOB, Email, Cell, JoinDate, Status, FitnessGoal, LockerID, GymID, MembershipID, TrainerSSN, Street, City, State, Zipcode, ERContactName, ERContactPhone],
    (err) => {
      if (err) {
        console.error("Error adding member:", err.message); 
        return res.status(500).json({ error: "Database error" });
      }
      res.status(201).json({ message: "Member added successfully!" });
    }
  );
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
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Database error" });
    }

    // Check if user exists
    if (!user) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // Direct string comparison
    if (password !== user.PasswordHash) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // Generate a JWT token if the password matches
    const token = jwt.sign({ username: user.Username }, SECRET_KEY, { expiresIn: "1h" });
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
    Cell,
    JoinDate,
    Status,
    FitnessGoal,
    LockerID,
    GymID,
    MembershipID,
    TrainerSSN,
    Street,
    City,
    State,
    Zipcode,
    ERContactName,
    ERContactPhone
  } = req.body;

  pool.query(
    "UPDATE Members SET Fname = ?, Lname = ?, DOB = ?, Email = ?, Cell = ?, JoinDate = ?, Status = ?, FitnessGoal = ?, LockerID = ?, GymID = ?, MembershipID = ?, TrainerSSN = ?, Street = ?, City = ?, State = ?, Zipcode = ? , ERContactName = ?, ERContactPhone = ? WHERE MemID = ?",
    [Fname, Lname, DOB, Email, Cell, JoinDate, Status, FitnessGoal, LockerID, GymID, MembershipID, TrainerSSN, Street, City, State, Zipcode, ERContactName, ERContactPhone, id],
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
    if (err) {
      console.error("Error deleting member:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json({ message: "Member deleted successfully!" });
  });
});

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the API!');
});

app.listen(5001, () => {
  console.log("Server is running on http://localhost:5001");
});

// Add a new staff (trainer)
app.post("/api/staffs", (req, res) => {
  const { StaffSSN, Fname, Lname, ContactInfo, GymID } = req.body;

  pool.query(
    "INSERT INTO Staffs (StaffSSN, Fname, Lname, ContactInfo, GymID) VALUES (?, ?, ?, ?, ?)",
    [StaffSSN, Fname, Lname, ContactInfo, GymID],
    (err) => {
      if (err) {
        console.error("Error adding staff:", err);
        return res.status(500).json({ error: "Database error" });
      }
      res.status(201).json({ message: "Staff added successfully!" });
    }
  );
});

// Get all staff members
app.get("/api/staffs", (req, res) => {
  pool.query("SELECT StaffSSN, Fname, Lname, ContactInfo, GymID FROM Staffs", (err, results) => {
    if (err) {
      console.error("Error fetching staff:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results); // Send back the results as JSON
  });
});

// Get a specific staff member by StaffSSN
app.get("/api/staffs/:ssn", (req, res) => {
  const { ssn } = req.params;
  pool.query("SELECT StaffSSN, Fname, Lname, ContactInfo, GymID FROM Staffs WHERE StaffSSN = ?", [ssn], (err, results) => {
    if (err) {
      console.error("Error fetching staff:", err);
      return res.status(500).json({ error: "Database error" });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "Staff not found" });
    }
    res.json(results[0]);
  });
});

// Update a staff member's details
app.put("/api/staffs/:ssn", (req, res) => {
  const { ssn } = req.params;
  const { Fname, Lname, ContactInfo, GymID } = req.body;

  pool.query(
    "UPDATE Staffs SET Fname = ?, Lname = ?, ContactInfo = ?, GymID = ? WHERE StaffSSN = ?",
    [Fname, Lname, ContactInfo, GymID, ssn],
    (err) => {
      if (err) {
        console.error("Error updating staff:", err);
        return res.status(500).json({ error: "Database error" });
      }
      res.json({ message: "Staff updated successfully!" });
    }
  );
});

// Delete a staff member
app.delete("/api/staffs/:ssn", (req, res) => {
  const { ssn } = req.params;
  pool.query("DELETE FROM Staffs WHERE StaffSSN = ?", [ssn], (err) => {
    if (err) {
      console.error("Error deleting staff:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json({ message: "Staff deleted successfully!" });
  });
});

// Get all equipment
app.get("/api/equipment", (req, res) => {
  pool.query("SELECT * FROM Equipment", (err, results) => {
    if (err) {
      res.status(500).send("Error fetching equipment data");
      return;
    }
    res.json(results);
  });
});

// Get equipment by ID
app.get("/api/equipment/:id", (req, res) => {
  const { id } = req.params;
  pool.query("SELECT * FROM Equipment WHERE EquipmentID = ?", [id], (err, results) => {
    if (err) {
      res.status(500).send("Error fetching equipment");
      return;
    }
    res.json(results[0]);
  });
});

// Add new equipment
app.post("/api/equipment", (req, res) => {
  const { EquipmentID, EquipmentName, TargetGroup, MaintainanceSchedule, ConditionStatus, GymID } = req.body;
  const sql = "INSERT INTO Equipment (EquipmentID, EquipmentName, TargetGroup, MaintainanceSchedule, ConditionStatus, GymID) VALUES (?, ?, ?, ?, ?, ?)";
  pool.query(sql, [EquipmentID, EquipmentName, TargetGroup, MaintainanceSchedule, ConditionStatus, GymID], (err, result) => {
    if (err) {
      res.status(500).send("Error adding equipment");
      return;
    }
    res.status(201).send("Equipment added");
  });
});

// Update equipment
app.put("/api/equipment/:id", (req, res) => {
  const { id } = req.params;
  const { EquipmentID, EquipmentName, TargetGroup, MaintainanceSchedule, ConditionStatus, GymID } = req.body;
  const sql = "UPDATE Equipment SET EquipmentID = ?, EquipmentName = ?, TargetGroup = ?, MaintainanceSchedule = ?, ConditionStatus = ?, GymID = ? WHERE EquipmentID = ?";
  pool.query(sql, [EquipmentID, EquipmentName, TargetGroup, MaintainanceSchedule, ConditionStatus, GymID, id], (err, result) => {
    if (err) {
      res.status(500).send("Error updating equipment");
      return;
    }
    res.send("Equipment updated");
  });
});

// Delete equipment
app.delete("/api/equipment/:id", (req, res) => {
  const { id } = req.params;
  pool.query("DELETE FROM Equipment WHERE EquipmentID = ?", [id], (err, result) => {
    if (err) {
      res.status(500).send("Error deleting equipment");
      return;
    }
    res.send("Equipment deleted");
  });
});

// Get all classes
app.get("/api/classes", (req, res) => {
  pool.query("SELECT * FROM Classes", (err, results) => {
    if (err) {
      res.status(500).send("Error fetching class data");
      return;
    }
    res.json(results);
  });
});

// Get class by ID
app.get("/api/classes/:id", (req, res) => {
  const { id } = req.params;
  pool.query("SELECT * FROM Classes WHERE ClassID = ?", [id], (err, results) => {
    if (err) {
      res.status(500).send("Error fetching class");
      return;
    }
    res.json(results[0]);
  });
});

// Add new class
app.post("/api/classes", (req, res) => {
  const { ClassID, Name, Schedule, TrainerSSN, MaxCapacity } = req.body;
  const sql = "INSERT INTO Classes (ClassID, Name, Schedule, TrainerSSN, MaxCapacity) VALUES (?, ?, ?, ?, ?)";
  pool.query(sql, [ClassID, Name, Schedule, TrainerSSN, MaxCapacity], (err, result) => {
    if (err) {
      res.status(500).send("Error adding class");
      return;
    }
    res.status(201).send("Class added");
  });
});

// Update class
app.put("/api/classes/:id", (req, res) => {
  const { id } = req.params;
  const { ClassID, Name, Schedule, TrainerSSN, MaxCapacity } = req.body;
  const sql = "UPDATE Classes SET ClassID = ?, Name = ?, Schedule = ?, TrainerSSN = ?, MaxCapacity = ? WHERE ClassID = ?";
  pool.query(sql, [ClassID, Name, Schedule, TrainerSSN, MaxCapacity, id], (err, result) => {
    if (err) {
      res.status(500).send("Error updating class");
      return;
    }
    res.send("Class updated");
  });
});

// Delete class
app.delete("/api/classes/:id", (req, res) => {
  const { id } = req.params;
  pool.query("DELETE FROM Classes WHERE ClassID = ?", [id], (err, result) => {
    if (err) {
      res.status(500).send("Error deleting class");
      return;
    }
    res.send("Class deleted");
  });
});

// Get all retail sales
app.get("/api/retailsales", (req, res) => {
  pool.query("SELECT * FROM Retail_Sales", (err, results) => {
    if (err) {
      res.status(500).send("Error fetching retail sales data");
      return;
    }
    res.json(results);
  });
});

// Get retail sale by ID
app.get("/api/retailsales/:id", (req, res) => {
  const { id } = req.params;
  pool.query("SELECT * FROM Retail_Sales WHERE TransactionID = ?", [id], (err, results) => {
    if (err) {
      res.status(500).send("Error fetching retail sale");
      return;
    }
    res.json(results[0]);
  });
});

// Add new retail sale
app.post("/api/retailsales", (req, res) => {
  const { ProductID, SalesDate, PaymentMethod, Stock, RestockSchedule, GymID, TransactionID, Price } = req.body;
  const sql = "INSERT INTO Retail_Sales (ProductID, SalesDate, PaymentMethod, Stock, RestockSchedule, GymID, TransactionID, Price) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  pool.query(sql, [ProductID, SalesDate, PaymentMethod, Stock, RestockSchedule, GymID, TransactionID, Price], (err, result) => {
    if (err) {
      res.status(500).send("Error adding retail sale");
      return;
    }
    res.status(201).send("Retail sale added");
  });
});

// Update retail sale
app.put("/api/retailsales/:id", (req, res) => {
  const { id } = req.params;
  const { ProductID, SalesDate, PaymentMethod, Stock, RestockSchedule, GymID, TransactionID, Price } = req.body;
  const sql = "UPDATE Retail_Sales SET ProductID = ?, SalesDate = ?, PaymentMethod = ?, Stock = ?, RestockSchedule = ?, GymID = ?, TransactionID = ?, Price = ? WHERE TransactionID = ?";
  pool.query(sql, [ProductID, SalesDate, PaymentMethod, Stock, RestockSchedule, GymID, TransactionID, Price, id], (err, result) => {
    if (err) {
      res.status(500).send("Error updating retail sale");
      return;
    }
    res.send("Retail sale updated");
  });
});

// Delete retail sale
app.delete("/api/retailsales/:id", (req, res) => {
  const { id } = req.params;
  pool.query("DELETE FROM Retail_Sales WHERE TransactionID = ?", [id], (err, result) => {
    if (err) {
      res.status(500).send("Error deleting retail sale");
      return;
    }
    res.send("Retail sale deleted");
  });
});

// Get all trainers
app.get("/api/trainers", (req, res) => {
  pool.query("SELECT * FROM Trainers", (err, results) => {
    if (err) {
      res.status(500).send("Error fetching trainers data");
      return;
    }
    res.json(results);
  });
});

// Get trainer by ID
app.get("/api/trainers/:id", (req, res) => {
  const { id } = req.params;
  pool.query("SELECT * FROM Trainers WHERE TrainerSSN = ?", [id], (err, results) => {
    if (err) {
      res.status(500).send("Error fetching trainer");
      return;
    }
    res.json(results[0]);
  });
});

// Add new trainer
app.post("/api/trainers", (req, res) => {
  const { TrainerSSN, Fname, Lname, GymID } = req.body;
  const sql = "INSERT INTO Trainers (TrainerSSN, Fname, Lname, GymID) VALUES (?, ?, ?, ?)";
  pool.query(sql, [TrainerSSN, Fname, Lname, GymID], (err) => {
    if (err) {
      res.status(500).send("Error adding trainer");
      return;
    }
    res.status(201).send("Trainer added");
  });
});

// Update trainer
app.put("/api/trainers/:id", (req, res) => {
  const { id } = req.params;
  const { TrainerSSN, Fname, Lname, GymID } = req.body;
  const sql = "UPDATE Trainers SET TrainerSSN = ?, Fname = ?, Lname = ?, GymID = ? WHERE TrainerSSN = ?";
  pool.query(sql, [TrainerSSN, Fname, Lname, GymID, id], (err, result) => {
    if (err) {
      res.status(500).send("Error updating trainer");
      return;
    }
    res.send("Trainer updated");
  });
});

// Delete trainer
app.delete("/api/trainers/:id", (req, res) => {
  const { id } = req.params;
  pool.query("DELETE FROM Trainers WHERE TrainerSSN = ?", [id], (err, result) => {
    if (err) {
      res.status(500).send("Error deleting trainer");
      return;
    }
    res.send("Trainer deleted");
  });
});

// Get all feedback
app.get("/api/feedback", (req, res) => {
  pool.query("SELECT * FROM Feedback", (err, results) => {
    if (err) {
      res.status(500).send("Error fetching feedback data");
      return;
    }
    res.json(results);
  });
});

// Get feedback by ID
app.get("/api/feedback/:id", (req, res) => {
  const { id } = req.params;
  pool.query("SELECT * FROM Feedback WHERE FeedbackID = ?", [id], (err, results) => {
    if (err) {
      res.status(500).send("Error fetching feedback");
      return;
    }
    res.json(results[0]);
  });
});

// Add new feedback
app.post("/api/feedback", (req, res) => {
  const { FeedbackID, MemID, FeedbackDate } = req.body;
  const sql = "INSERT INTO Feedback (FeedbackID, MemID, FeedbackDate) VALUES (?, ?, ?)";
  pool.query(sql, [FeedbackID, MemID, FeedbackDate], (err) => {
    if (err) {
      res.status(500).send("Error adding feedback");
      return;
    }
    res.status(201).send("Feedback added");
  });
});

// Update feedback
app.put("/api/feedback/:id", (req, res) => {
  const { id } = req.params;
  const { FeedbackID, MemID, FeedbackDate } = req.body;
  const sql = "UPDATE Feedback SET FeedbackID = ?, MemID = ?, FeedbackDate = ? WHERE FeedbackID = ?";
  pool.query(sql, [FeedbackID, MemID, FeedbackDate, id], (err) => {
    if (err) {
      res.status(500).send("Error updating feedback");
      return;
    }
    res.send("Feedback updated");
  });
});

// Delete feedback
app.delete("/api/feedback/:id", (req, res) => {
  const { id } = req.params;
  pool.query("DELETE FROM Feedback WHERE FeedbackID = ?", [id], (err) => {
    if (err) {
      res.status(500).send("Error deleting feedback");
      return;
    }
    res.send("Feedback deleted");
  });
});
