import User from '../models/user-model';
import asyncHandler from './async-handler.js';
import jwt , { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { Types } from 'mongoose';

// Extend the Request type to include a 'user' field
interface AuthenticatedRequest extends Request {
  user?: any; // For complete beginners, using 'any' avoids type errors. You can refine this later.
}

// User must be authenticated
const protect = asyncHandler(async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  let token;
  // Read JWT from the 'jwt' cookie
  token = req.cookies.jwt;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;

      req.user = await User.findById(decoded.userId).select('-password');

      console.log("aaa", req.user)

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  } else {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

// User must be an admin
const admin = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized as an admin');
  }
};

export { protect, admin };

