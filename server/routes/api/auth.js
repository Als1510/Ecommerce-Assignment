const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

require('dotenv').config();

const SECRET_KEY = process.env.SECRET_KEY;

let users = [
  { username: 'admin', password: 'admin', role: 'admin' },
];

router.post('/register', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }
  const userExists = users.find(user => user.username === username);
  if (userExists) {
    return res.status(400).json({ error: 'User already exists' });
  }
  users.push({ username, password, role: 'user' });
  res.status(201).json({ message: 'User registered successfully' });
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(user => user.username === username && user.password === password);
  if (!user) {
    return res.status(400).json({ error: 'Invalid username or password' });
  }
  const token = jwt.sign({ username: user.username, role: user.role }, SECRET_KEY, { expiresIn: '1h' });
  res.status(200).json({ message: 'Login successful', token });
});


module.exports = router;
