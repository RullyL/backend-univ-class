import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { errorResponse } from '../utils/response';

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change';

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (req.method === 'GET') return next();
  if (req.path === '/auth/login') return next();

  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : '';
  if (!token) {
    return errorResponse(res, 'Unauthorized', 401);
  }

  try {
    jwt.verify(token, JWT_SECRET);
    return next();
  } catch {
    return errorResponse(res, 'Unauthorized', 401);
  }
};

export default authMiddleware;
