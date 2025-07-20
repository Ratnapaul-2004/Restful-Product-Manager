const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.redirect('/login?error=Login first');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.log('JWT verification failed:', err.message);
    return res.redirect('/login?error=Login first');
  }
};

module.exports = authMiddleware;