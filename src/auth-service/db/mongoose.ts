import mongoose from "mongoose";
import { AUTH_MONGO_URI, AUTH_DB_NAME } from "../../common/config/env.js";

export async function connectAuthDb(): Promise<void> {
  // 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
  if (mongoose.connection.readyState === 1) return;           // already connected
  if (mongoose.connection.readyState === 2) {                 // connecting: wait
    await new Promise<void>((resolve, reject) => {
      mongoose.connection.once("connected", () => resolve());
      mongoose.connection.once("error", (e) => reject(e));
    });
    return;
  }

  await mongoose.connect(AUTH_MONGO_URI, { dbName: AUTH_DB_NAME });
  console.log(`✅ Mongoose connected (auth): ${AUTH_DB_NAME}`);
}

export function authConnection() {
  return mongoose.connection; // no “not connected” throw here anymore
}
