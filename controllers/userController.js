const db = require('../db');

// Register a new user
exports.registerUser = (req, res) => {
    const { fullname, email, username, password } = req.body;
    const query = 'INSERT INTO users (fullname, email, username, password) VALUES (?, ?, ?, ?)';

    db.query(query, [fullname, email, username, password], (err, result) => {
        if (err) {
            console.error('Error registering user:', err);
            return res.status(500).send('Error registering user');
        }
        res.redirect('/user_login.html');
    });
};

// Login
exports.loginUser = (req, res) => {
    const { username, password } = req.body;
    const query = 'SELECT * FROM users WHERE username = ? AND password = ?';

    db.query(query, [username, password], (err, results) => {
        if (err) {
            console.error('Error logging in:', err);
            return res.status(500).send('Error logging in');
        }

        if (results.length > 0) {
            res.redirect('/user_dashboard.html');
        } else {
            res.send('Invalid username or password');
        }
    });
};

// Get all users (optional, for admin/debugging)
exports.getAllUsers = (req, res) => {
    const query = 'SELECT * FROM users';

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching users:', err);
            return res.status(500).send('Error fetching users');
        }
        res.json(results);
    });
};

// Edit user
exports.editUser = (req, res) => {
    const userId = req.params.id;
    const query = 'SELECT * FROM users WHERE id = ?';

    db.query(query, [userId], (err, results) => {
        if (err) {
            console.error('Error fetching user:', err);
            return res.status(500).send('Error fetching user');
        }

        if (results.length === 0) {
            return res.status(404).send('User not found');
        }

        res.json(results[0]); // You can render a form if using templating
    });
};

// Update user
exports.updateUser = (req, res) => {
    const userId = req.params.id;
    const { fullname, email, username, password } = req.body;
    const query = 'UPDATE users SET fullname = ?, email = ?, username = ?, password = ? WHERE id = ?';

    db.query(query, [fullname, email, username, password, userId], (err, result) => {
        if (err) {
            console.error('Error updating user:', err);
            return res.status(500).send('Error updating user');
        }
        res.send('User updated successfully');
    });
};

// Delete user
exports.deleteUser = (req, res) => {
    const userId = req.params.id;
    const query = 'DELETE FROM users WHERE id = ?';

    db.query(query, [userId], (err, result) => {
        if (err) {
            console.error('Error deleting user:', err);
            return res.status(500).send('Error deleting user');
        }
        res.send('User deleted successfully');
    });
};
