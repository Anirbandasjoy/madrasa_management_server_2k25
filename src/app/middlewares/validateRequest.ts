import { AnyZodObject } from 'zod';
import { Request, Response, NextFunction } from 'express';

const validateRequest =
  (schema: AnyZodObject) => (req: Request, _res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        headers: req.headers,
        cookies: req.cookies,
        params: req.params,
      });
      next();
    } catch (error: any) {
      next(error);
    }
  };

export default validateRequest;
