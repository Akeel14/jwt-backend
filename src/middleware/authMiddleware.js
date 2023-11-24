// this is a middleware used for authorization for protected routes
import jwt from 'jsonwebtoken';
export default class AuthMiddleware {
  static verifyToken(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    jwt.verify(token, process.env.PRIVATE_KEY_JWT, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: 'Forbidden' });
      }
      req.userId = decoded.userId;
      next();
    });
  }
}
