const express = require('express');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(express.json());
app.use(cookieParser());

// Vulnerable JWT implementation
const JWT_SECRET = "mysecretkey123"; // Vulnerability: Hardcoded secret

// Vulnerable login endpoint
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Vulnerability: No input validation
    const token = jwt.sign({ username }, JWT_SECRET);
    res.cookie('token', token);
    res.json({ success: true });
});

// Vulnerable file reading endpoint
app.get('/file', (req, res) => {
    const fileName = req.query.name;
    // Vulnerability: Path traversal
    const content = fs.readFileSync(fileName, 'utf8');
    res.send(content);
});

// Vulnerable SQL query (simulated)
app.get('/users', (req, res) => {
    const userId = req.query.id;
    // Vulnerability: SQL Injection
    const query = `SELECT * FROM users WHERE id = ${userId}`;
    // Simulated database call
    res.json({ query });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});

