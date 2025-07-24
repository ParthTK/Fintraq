const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all transactions
router.get('/', (req, res) => {
  db.query('SELECT * FROM Transaction', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// Get single transaction
router.get('/:id', (req, res) => {
  db.query('SELECT * FROM Transaction WHERE transaction_id = ?', [req.params.id], (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// Add transaction
router.post('/', (req, res) => {
  const { account_id, amount, transaction_type, description } = req.body;
  db.query(
    'INSERT INTO Transaction (account_id, amount, transaction_type, description) VALUES (?, ?, ?, ?)',
    [account_id, amount, transaction_type, description],
    (err) => {
      if (err) return res.status(500).send(err);
      res.send('Transaction added!');
    }
  );
});

// Delete transaction
router.delete('/:id', (req, res) => {
  db.query('DELETE FROM Transaction WHERE transaction_id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).send(err);
    res.send('Transaction deleted!');
  });
});

module.exports = router;
