import dotenv from "dotenv";
dotenv.config();

function need(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env var: ${name}`);
  return v;
}

// Auth DB
export const AUTH_MONGO_URI = need("AUTH_MONGO_URI");
export const AUTH_DB_NAME   = process.env.AUTH_DB_NAME ?? "auth_db";

// Task DB
export const TASK_MONGO_URI = need("TASK_MONGO_URI");
export const TASK_DB_NAME   = process.env.TASK_DB_NAME ?? "task_db";

// ===== JWT & Token Settings =====
export const JWT_SECRET = need("JWT_SECRET");
export const REFRESH_SECRET = need("REFRESH_SECRET");
export const ACCESS_TTL = process.env.ACCESS_TTL ?? "15m";     // access token lifetime
export const REFRESH_TTL = process.env.REFRESH_TTL ?? "7d";    // refresh token lifetime

// App
export const PORT = process.env.PORT ?? "3000";
