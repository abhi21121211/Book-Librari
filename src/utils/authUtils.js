const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1] || '';
  // const token = req.headers.authorization || '';
  if (!token) {
    // console.log("token1");
    return res.status(401).json({ message: 'Authentication failed' });
  }
  console.log(token);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    // console.log(decoded)
    next();
  } catch (error) {
    console.log("token2");
    return res.status(401).json({ message: 'Authentication failed' });
  }
};

module.exports = { authenticateToken };