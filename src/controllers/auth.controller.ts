import { Request, Response } from 'express';
import jwt, { type Secret, type SignOptions } from 'jsonwebtoken';
import { successResponse, errorResponse } from '../utils/response';

const ADMIN_USER = process.env.ADMIN_USER || 'admin';
const ADMIN_PASS = process.env.ADMIN_PASS || 'admin123';
const JWT_SECRET: Secret = process.env.JWT_SECRET || 'dev-secret-change';
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

    const signOptions: SignOptions = {
      expiresIn: JWT_EXPIRES_IN as SignOptions['expiresIn'],
    };
    const token = jwt.sign({ sub: 'admin', role: 'admin', username }, JWT_SECRET, signOptions);

    return successResponse(res, 'Login success', { token, expiresIn: JWT_EXPIRES_IN });
  } catch (err: any) {
    return errorResponse(res, err.message || 'Login failed');
  }
};

export default { login };
