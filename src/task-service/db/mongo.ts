import { MongoClient, Db } from "mongodb";
import { AUTH_DB_NAME, TASK_MONGO_URI } from "../../common/config/env.js";

let client: MongoClient | undefined;
let db: Db | undefined;

export async function connectTaskDb(): Promise<Db> {
  if (db) return db;
  client = new MongoClient(TASK_MONGO_URI);
  await client.connect();
  db = client.db(AUTH_DB_NAME);
  console.log(`✅ Task DB connected: ${AUTH_DB_NAME}`);
  return db;
}

export function getTaskDb(): Db {
  if (!db) throw new Error("Auth DB not connected yet");
  return db;
}
