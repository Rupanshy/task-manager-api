import mongoose from "mongoose";
import { TASK_MONGO_URI, TASK_DB_NAME, JWT_SECRET } from "../../common/config/env.js";

let conn: mongoose.Connection | null = null;

export async function connectTaskDb() {
  const uri = `${TASK_MONGO_URI}/${TASK_DB_NAME}?retryWrites=true&w=majority`;
  console.log('[TASK-DB] connecting to', uri);

  await mongoose.connect(uri, {
    serverSelectionTimeoutMS: 5000,    // fail fast if DB not reachable
    socketTimeoutMS: 20000,
    maxPoolSize: 10,
    // Optional: to reveal errors instead of buffering
    // bufferCommands: false as any,
  } as any);

  console.log('[TASK-DB] connected');
  return mongoose.connection;
}
