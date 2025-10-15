import jwt, { SignOptions } from "jsonwebtoken";
import { JWT_SECRET, REFRESH_SECRET, ACCESS_TTL, REFRESH_TTL } from "../../common/config/env.js";

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
