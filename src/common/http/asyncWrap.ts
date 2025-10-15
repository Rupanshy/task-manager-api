import type { Request, Response, NextFunction, RequestHandler } from "express";

export type AsyncHandler = (req: Request, res: Response, next: NextFunction) => Promise<void>;

export const asyncWrap = (fn: AsyncHandler): RequestHandler =>
  (req, res, next) => { fn(req, res, next).catch(next); };
