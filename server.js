const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Create connection to MySQL database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'yourusername',
    password: 'yourpassword',
    database: 'mydatabase'
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database');
});

// Create a new user
app.post('/users', (req, res) => {
    const { username, email, password_hash } = req.body;
    const sql = 'INSERT INTO Users (username, email, password_hash) VALUES (?, ?, ?)';
    db.query(sql, [username, email, password_hash], (err, result) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.status(201).send({ user_id: result.insertId });
    });
});

// Create a new product
app.post('/products', (req, res) => {
    const { user_id, name, description, price } = req.body;
    const sql = 'INSERT INTO Products (user_id, name, description, price) VALUES (?, ?, ?, ?)';
    db.query(sql, [user_id, name, description, price], (err, result) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.status(201).send({ product_id: result.insertId });
    });
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
