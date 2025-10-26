// src/common/config/env.ts
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

/** ESM-safe __dirname / __filename */
const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

/** Find candidate .env files */
function findEnvPaths(): string[] {
  const fromCwd = path.resolve(process.cwd(), ".env");              // when running from repo root
  const up1     = path.resolve(__dirname, "../../.env");            // from src/common
  const up2     = path.resolve(__dirname, "../../../.env");         // safety
  const up3     = path.resolve(__dirname, "../../../../.env");      // safety
  return [fromCwd, up1, up2, up3].filter((p) => fs.existsSync(p));
}

/** Load exactly one .env (prefer the most root-like) and log it */
function loadRootEnv(): string {
  const found = findEnvPaths();
  if (found.length === 0) {
    dotenv.config(); // default search
    console.warn("[env] No explicit .env found; using default dotenv search");
    return "(default search)";
  }
  // pick the last (tends to be highest up the tree / repo root)
  const chosen = found[found.length - 1];
  if (found.length > 1) {
    console.warn("[env] Multiple .env files detected:", found);
    console.warn("[env] Using:", chosen, "(delete the others to avoid surprises)");
  }
  dotenv.config({ path: chosen });
  console.log("[env] loaded", chosen);
  return chosen;
}

const loadedPath = loadRootEnv();

function need(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env var: ${name} (from ${loadedPath})`);
  return v;
}

// ===== Exported config =====

// Auth DB
export const AUTH_MONGO_URI = need("AUTH_MONGO_URI");
export const AUTH_DB_NAME   = process.env.AUTH_DB_NAME ?? "auth_db";

// Task DB
export const TASK_MONGO_URI = need("TASK_MONGO_URI");
export const TASK_DB_NAME   = process.env.TASK_DB_NAME ?? "task_db";

// JWT & Token
export const JWT_SECRET     = need("JWT_SECRET").trim();
export const REFRESH_SECRET = need("REFRESH_SECRET").trim();
export const ACCESS_TTL     = (process.env.ACCESS_TTL ?? "15m").trim();
export const REFRESH_TTL    = (process.env.REFRESH_TTL ?? "7d").trim();

// Ports
export const PORT     = process.env.PORT ?? "3000";
export const AUTHPORT = process.env.AUTH_PORT ?? "3001";
