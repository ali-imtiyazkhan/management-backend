const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    console.log('Authorization header:', authHeader);

    // ✅ Fixed: startsWith (capital W)
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        error: 'Authorization token missing or invalid',
      });
    }

    // Extract token
    const token = authHeader.split(' ')[1];
    console.log('Token:', token);

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'mysecretkey');

    // Attach user info to request
    req.user = decoded;
    next();
  } catch (err) {
    console.error('JWT verification failed:', err.message);
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

module.exports = authMiddleware;
