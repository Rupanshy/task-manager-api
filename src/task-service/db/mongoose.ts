import mongoose from "mongoose";
import { TASK_MONGO_URI, TASK_DB_NAME } from "../../common/config/env.js";

let conn: mongoose.Connection | null = null;

export async function connectTaskDb() {
  if (conn) return;
  conn = await mongoose.createConnection(TASK_MONGO_URI, { dbName: TASK_DB_NAME }).asPromise();
  console.log(`✅ Mongoose connected (task): ${TASK_DB_NAME}`);
}

export function taskConnection() {
  if (!conn) throw new Error("Task mongoose not connected");
  return conn;
}
