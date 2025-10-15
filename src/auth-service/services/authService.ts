import jwt, { SignOptions } from "jsonwebtoken";
import { JWT_SECRET, REFRESH_SECRET, ACCESS_TTL, REFRESH_TTL } from "../../common/config/env.js";
import bcrypt from "bcrypt";
import { UserModel } from "../models/User.js";

export async function createUser(name: string, email: string, password: string) {
  const User = UserModel();
  const exists = await User.exists({ email });
  if (exists) return null;
  const passwordHash = await bcrypt.hash(password, 10);
  const doc = await User.create({ name, email, passwordHash, role: "user" });
  return doc.toJSON(); // toJSON removes passwordHash/_id/__v
}

export async function findUserByEmail(email: string) {
  const User = UserModel();
  return User.findOne({ email }).lean();
}

export async function verifyPassword(plain: string, hash: string) {
  return bcrypt.compare(plain, hash);
}

// Let TS know these are valid ms-style strings:
type ExpiresIn = NonNullable<SignOptions["expiresIn"]>; // number | ms.StringValue

export function signAccessToken(sub: string, role: string) {
  const opts: SignOptions = { algorithm: "HS256", expiresIn: ACCESS_TTL as ExpiresIn };
  return jwt.sign({ sub, role }, JWT_SECRET, opts);
}
export function signRefreshToken(sub: string, role: string) {
  const opts: SignOptions = { algorithm: "HS256", expiresIn: REFRESH_TTL as ExpiresIn };
  return jwt.sign({ sub, role }, REFRESH_SECRET, opts);
}

export function verifyAccessToken(token: string) {
  return jwt.verify(token, JWT_SECRET) as { sub: string; role: string; iat: number; exp: number };
}
export function verifyRefreshToken(token: string) {
  return jwt.verify(token, REFRESH_SECRET) as { sub: string; role: string; iat: number; exp: number };
}
