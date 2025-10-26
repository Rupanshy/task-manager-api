import { z } from 'zod';
import { RequestHandler } from 'express';

export const validate = <T extends z.ZodTypeAny>(
  schema: T,
  target: 'body' | 'query' | 'params' = 'body'
): RequestHandler => {
  return (req, res, next) => {
    const result = schema.safeParse((req as any)[target]);
    if (!result.success) {
      res.status(400).json({
        error: 'VALIDATION_ERROR',
        message: 'Invalid input',
        details: result.error.flatten(),
      });
      return;
    }
    (req as any)[target] = result.data;
    next();
  };
};
