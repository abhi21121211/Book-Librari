// src/utils/authUtils.js

const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;
const dotenv = require('dotenv');
dotenv.config();
const authenticateToken = (req, res, next) => {
  const token = req.cookies.token || '';

  if (!token) {
    return res.status(401).json({ message: 'Authentication failed' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Authentication failed' });
  }
};

module.exports = { authenticateToken };
