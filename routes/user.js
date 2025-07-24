const express = require('express');
const router = express.Router();
const db = require('../db');

// Create user (Register)
router.post('/register', (req, res) => {
  const { full_name, email, username, password } = req.body;
  const sql = 'INSERT INTO users (full_name, email, username, password) VALUES (?, ?, ?, ?)';
  db.query(sql, [full_name, email, username, password], (err, result) => {
    if (err) {
      console.error('Error during registration:', err);
      return res.status(500).json({ message: 'Registration failed' });
    }
    res.status(201).json({ message: 'User registered successfully' });
  });
});

// Login
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';
  db.query(sql, [username, password], (err, results) => {
    if (err) {
      console.error('Login error:', err);
      return res.status(500).json({ message: 'Login failed' });
    }
    if (results.length > 0) {
      return res.status(200).json({ message: 'Login successful' });
    } else {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  });
});

// Read all users
router.get('/', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching users' });
    }
    res.json(results);
  });
});

// Read single user
router.get('/:id', (req, res) => {
  const userId = req.params.id;
  db.query('SELECT * FROM users WHERE id = ?', [userId], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching user' });
    }
    res.json(results[0]);
  });
});

// Update user
router.put('/:id', (req, res) => {
  const userId = req.params.id;
  const { full_name, email, username, password } = req.body;
  const sql = 'UPDATE users SET full_name = ?, email = ?, username = ?, password = ? WHERE id = ?';
  db.query(sql, [full_name, email, username, password, userId], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error updating user' });
    }
    res.json({ message: 'User updated successfully' });
  });
});

// Delete user
router.delete('/:id', (req, res) => {
  const userId = req.params.id;
  db.query('DELETE FROM users WHERE id = ?', [userId], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error deleting user' });
    }
    res.json({ message: 'User deleted successfully' });
  });
});

module.exports = router;
