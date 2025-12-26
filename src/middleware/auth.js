import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/jwt.js';

export const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Token missing" });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Token expired" });
    req.user = user;
    next();
  });
};
