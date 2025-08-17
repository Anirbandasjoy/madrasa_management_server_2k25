import rateLimit from 'express-rate-limit';
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

export const loginLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 50,
  standardHeaders: true,
  legacyHeaders: false,

  handler: (_req: Request, _res: Response, next: NextFunction) => {
    const error = {
      statusCode: StatusCodes.TOO_MANY_REQUESTS,
      message: 'Too many login attempts. Try again after 10 minutes.',
    };
    next(error);
  },
});
