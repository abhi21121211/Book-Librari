// src/utils/authUtils.js

const jwt = require('jsonwebtoken');

const dotenv = require('dotenv');
dotenv.config();
const authenticateToken = (req, res, next) => {
  const token = req.cookies.token || ''
  
  console.log(req.cookies.token)
  if (!token) {
    console.log("token1");
    return res.status(401).json({ message: 'Authentication failed' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.log("token2");
    return res.status(401).json({ message: 'Authentication failed' });
  }
};

module.exports = { authenticateToken };
