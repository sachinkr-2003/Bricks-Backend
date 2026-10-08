const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the token (exclude PIN)
      req.user = await User.findById(decoded.id).select('-pin');
      
      if (!req.user) {
         return res.status(401).json({ message: 'User no longer exists. Please login again.' });
      }

      next();
    } catch (error) {
      console.error('[AUTH MIDDLEWARE] Token failed');
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

const optionalAuth = async (req, res, next) => {
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-pin');
    } catch (_) {}
  }
  next();
};

module.exports = { protect, adminOrManager, optionalAuth };
