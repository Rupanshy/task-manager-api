import type { Request, Response } from "express";
import { z } from "zod";
import { registerSchema, loginSchema } from "../schemas/authSchema.js";
import {
  createUser, findUserByEmail, verifyPassword,
  signAccessToken, signRefreshToken,
  verifyAccessToken, verifyRefreshToken
} from "../services/authService.js";

// shared zod validate helper
function validate<T>(schema: z.ZodSchema<T>, data: unknown): T {
  const res = schema.safeParse(data);
  if (!res.success) {
    const details = res.error.issues.map(i => ({ path: i.path, message: i.message }));
    const e: any = new Error("VALIDATION_ERROR"); e.status = 400; e.details = details; throw e;
  }
  return res.data;
}

export async function register(req: Request, res: Response): Promise<void> {
  const { name, email, password } = validate(registerSchema, req.body);
  const u = await createUser(name, email, password);
  if (!u) { res.status(409).json({ error: "EMAIL_EXISTS" }); return; }
  res.status(201).json(u);
}

export async function login(req: Request, res: Response): Promise<void> {
  const { email, password } = validate(loginSchema, req.body);
  const u = await findUserByEmail(email);
  if (!u) { res.status(401).json({ error: "INVALID_CREDENTIALS" }); return; }
  const ok = await verifyPassword(password, u.passwordHash);
  if (!ok) { res.status(401).json({ error: "INVALID_CREDENTIALS" }); return; }
  const accessToken = signAccessToken(String(u._id), u.role);
  const refreshToken = signRefreshToken(String(u._id), u.role);
  res.json({ accessToken, refreshToken });
}

export async function refresh(req: Request, res: Response): Promise<void> {
  const token = req.body?.refreshToken;
  if (!token) { res.status(400).json({ error: "MISSING_REFRESH_TOKEN" }); return; }
  const { sub, role } = verifyRefreshToken(token);
  const accessToken = signAccessToken(sub, role);
  res.json({ accessToken });
}

export async function me(req: Request, res: Response): Promise<void> {
  res.json((req as any).user);
}

// auth middleware (keep it in controller file or move to /middlewares)
export function requireAuth(req: Request, res: Response, next: Function): void {
  const auth = req.headers.authorization || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";
  if (!token) { res.status(401).json({ error: "UNAUTHENTICATED" }); return; }
  try {
    const { sub, role } = verifyAccessToken(token);
    (req as any).user = { id: sub, role };
    (next as any)();
  } catch { res.status(401).json({ error: "UNAUTHENTICATED" }); }
}
