import mongoose from "mongoose";
import { AUTH_MONGO_URI, AUTH_DB_NAME } from "../../common/config/env.js";

let ready = false;

export async function connectAuthDb() {
  if (ready) return;
  await mongoose.connect(AUTH_MONGO_URI, { dbName: AUTH_DB_NAME });
  ready = true;
  console.log(`✅ Mongoose connected (auth): ${AUTH_DB_NAME}`);
}

export function authConnection() {
  if (!ready) throw new Error("Auth mongoose not connected");
  return mongoose.connection;
}
