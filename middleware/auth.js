const jwt = require('jsonwebtoken');  // Import JWT

module.exports = function (req, res, next) {
  const token = req.header('Authorization');  // Get token from request header
  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);  // Verify token
    req.user = decoded;  // Attach user data to request object
    next();  // Call next middleware
  } catch (err) {
    res.status(401).json({ msg: 'Invalid token' });
  }
};
