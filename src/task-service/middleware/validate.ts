// middleware/validate.ts
import { z } from 'zod';
import type { RequestHandler } from 'express';

export const validate = <T extends z.ZodTypeAny>(
  schema: T,
  target: 'body' | 'query' | 'params' = 'body'
): RequestHandler => {
  return (req, res, next) => {
    const src =
      target === 'body' ? req.body :
      target === 'query' ? req.query :
      req.params;

    const result = schema.safeParse(src);
    if (!result.success) {
      return res.status(400).json({
        error: 'VALIDATION_ERROR',
        message: 'Invalid input',
        details: result.error.flatten(),
      });
    }

    if (target === 'body') {
      // body is safe to assign
      (req as any).body = result.data;
    } else {
      // query/params: DO NOT reassign built-ins in Express 5
      (res.locals as any).validated ??= {};
      (res.locals as any).validated[target] = result.data;
    }

    next();
  };
};
