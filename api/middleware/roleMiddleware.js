// backend/middleware/authorize.js

const roleMiddleware = (roles) => (req, res, next) => {
  if (roles.includes(req.user.designation)) {
    next();
  } else {
    res.status(403).json({ message: 'Forbidden: You do not have the right role' });
  }
};

module.exports = roleMiddleware;
