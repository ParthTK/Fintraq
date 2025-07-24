const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));


// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Change if you use a different MySQL user
  password: 'Pass@123', // Add your MySQL password if any
  database: 'fintraq_db'
});

// Connect to database
db.connect((err) => {
  if (err) {
    console.error('Database connection failed: ', err.stack);
    return;
  }
  console.log('Connected to MySQL database.');
});

// Register endpoint
app.post('/register', (req, res) => {
  const { full_name, email, username, password } = req.body;

  if (!full_name || !email || !username || !password) {
    return res.status(400).json({ success: false, message: 'All fields are required.' });
  }

  // Check if email or username already exists
  const checkQuery = `SELECT * FROM user WHERE email = ? OR username = ?`;
  db.query(checkQuery, [email, username], (err, results) => {
    if (err) {
      console.error('Error checking for existing user:', err);
      return res.status(500).json({ success: false, message: 'Database error.' });
    }

    if (results.length > 0) {
      return res.status(409).json({ success: false, message: 'Email or username already in use.' });
    }

    // Insert new user
    const insertQuery = `INSERT INTO user (full_name, email, username, password) VALUES (?, ?, ?, ?)`;
    db.query(insertQuery, [full_name, email, username, password], (err, result) => {
      if (err) {
        console.error('Error inserting user:', err);
        return res.status(500).json({ success: false, message: 'Registration failed.' });
      }

      return res.status(201).json({ success: true, message: 'User registered successfully!' });
    });
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
