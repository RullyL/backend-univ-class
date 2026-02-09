import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { successResponse, errorResponse } from '../utils/response';

const ADMIN_USER = process.env.ADMIN_USER || 'admin';
const ADMIN_PASS = process.env.ADMIN_PASS || 'admin123';
const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

const login = (req: Request, res: Response) => {
  try {
    const { username, password } = req.body ?? {};
    if (!username || !password) {
      return errorResponse(res, 'username and password are required', 400);
    }

    if (username !== ADMIN_USER || password !== ADMIN_PASS) {
      return errorResponse(res, 'Invalid credentials', 401);
    }

    const token = jwt.sign(
      { sub: 'admin', role: 'admin', username },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    return successResponse(res, 'Login success', { token, expiresIn: JWT_EXPIRES_IN });
  } catch (err: any) {
    return errorResponse(res, err.message || 'Login failed');
  }
};

export default { login };
