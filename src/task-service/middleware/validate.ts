import { ZodObject, ZodError } from "zod";
import { Request, Response, NextFunction } from "express";

export const validate = (schema: ZodObject, target: "body" | "query" | "params" = "body") => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsed = schema.parse(req[target]);
      (req as any)[target] = parsed; // replace with validated data
      next();
    } catch (err) {
      const zodError = err as ZodError;
      return res.status(400).json({
        error: "VALIDATION_ERROR",
        message: "Invalid input",
        details: zodError.flatten(),
      });
    }
  };
};
