const express = require('express');
const router = express.Router();
const db = require('../db');

// Add new insight
router.post('/', (req, res) => {
  const { user_id, message } = req.body;
  db.query(
    'INSERT INTO Insight (user_id, message) VALUES (?, ?)',
    [user_id, message],
    (err) => {
      if (err) return res.status(500).send(err);
      res.send('Insight added!');
    }
  );
});

// Get all insights
router.get('/', (req, res) => {
  db.query('SELECT * FROM Insight', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// Update an insight by ID
router.put('/:id', (req, res) => {
  const { message } = req.body;
  db.query(
    'UPDATE Insight SET message = ? WHERE insight_id = ?',
    [message, req.params.id],
    (err) => {
      if (err) return res.status(500).send(err);
      res.send('Insight updated!');
    }
  );
});

// Delete an insight by ID
router.delete('/:id', (req, res) => {
  db.query(
    'DELETE FROM Insight WHERE insight_id = ?',
    [req.params.id],
    (err) => {
      if (err) return res.status(500).send(err);
      res.send('Insight deleted!');
    }
  );
});

module.exports = router;
