const jwt = require('jsonwebtoken');
require('dotenv').config()

module.exports = function (req, res, next) {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.username = decoded.username;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
}