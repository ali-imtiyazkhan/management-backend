const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    console.log('Authorization header:', authHeader);


    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        error: 'Authorization token missing or invalid',
      });
    }


    const token = authHeader.split(' ')[1];
    console.log('Token:', token);


    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'mysecretkey');


    req.user = decoded;
    next();
  } catch (err) {
    console.error('JWT verification failed:', err.message);
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

module.exports = authMiddleware;
