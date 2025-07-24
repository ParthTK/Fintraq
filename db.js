const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Pass@123',
  database: 'fintraq_db'
});

db.connect((err) => {
  if (err) {
    console.error('Database connection error:', err.stack);
    return;
  }
  console.log('Connected to MySQL database.');
});

module.exports = db;
