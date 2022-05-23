import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { createError } from './error';

export const verifyToken = (req: any, res: Response, next: NextFunction) => {
  const token = req.cookies.access_token;
  if (!token) return next(createError(401, 'You are Not Authenticated!'));

  verify(token, `${process.env.JWT_SECRET}`, (err: any, user: any) => {
    if (err) return next(createError(403, 'Invalid Token!'));
    req.user = user;
    next();
  });
};

export const verifyUser = (req: any, res: Response, next: NextFunction) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, 'You Are Not Authorized!'));
    }
  });
};

export const verifyAdmin = (req: any, res: Response, next: NextFunction) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, 'You Are Not Authorized!'));
    }
  });
};
