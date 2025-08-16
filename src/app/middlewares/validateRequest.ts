import { AnyZodObject } from 'zod';
import { Request, Response, NextFunction } from 'express';
import { handleZodError } from '../errors/handlers/zodErrorHandler';
import { sendErrorResponse } from '@/utils/response';

const validateRequest =
  (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
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
      const { message, statusCode, errorDetails } = handleZodError(error);
      sendErrorResponse(res, {
        statusCode,
        message,
        error: errorDetails,
      });
    }
  };

export default validateRequest;
