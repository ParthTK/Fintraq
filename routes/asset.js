const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/', (req, res) => {
  const { user_id, asset_name, value } = req.body;
  db.query('INSERT INTO Asset (user_id, asset_name, value) VALUES (?, ?, ?)', [user_id, asset_name, value], (err) => {
    if (err) return res.status(500).send(err);
    res.send('Asset added!');
  });
});

router.get('/', (req, res) => {
  db.query('SELECT * FROM Asset', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

router.put('/:id', (req, res) => {
  const { asset_name, value } = req.body;
  db.query('UPDATE Asset SET asset_name = ?, value = ? WHERE asset_id = ?', [asset_name, value, req.params.id], (err) => {
    if (err) return res.status(500).send(err);
    res.send('Asset updated!');
  });
});

router.delete('/:id', (req, res) => {
  db.query('DELETE FROM Asset WHERE asset_id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).send(err);
    res.send('Asset deleted!');
  });
});

module.exports = router;