// task-service/src/auth.ts
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const JWT_SECRET = (process.env.JWT_SECRET ?? '').trim();
console.log("Printing ", JWT_SECRET);

type Decoded = { sub: string; role: string; iat: number; exp: number };

export function verifyAccessToken(token: string): Decoded {
  try {
    const t = token.trim();
    if (!JWT_SECRET) throw new Error('JWT_SECRET missing in task-service');
    const decoded = jwt.verify(t, JWT_SECRET, { algorithms: ['HS256'] }) as Decoded;
    if (!decoded?.sub) throw new Error('No sub in token');
    console.log("Printing decoded token ", decoded);
    return decoded;
  } catch (e: any) {
    console.error('[TASK verify] FAIL:', e.name, e.message); // <-- will tell us exact cause
    throw e;
  }
}

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const auth = req.headers.authorization || '';
  if (!auth.startsWith('Bearer ')) return res.status(401).json({ error: 'UNAUTHENTICATED' });

  const token = auth.slice(7).trim();
  try {
    const { sub, role } = verifyAccessToken(token);
    (req as any).user = { id: sub, role };
    next();
  } catch {
    return res.status(401).json({ error: 'UNAUTHENTICATED' });
  }
}
