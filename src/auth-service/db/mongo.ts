import { MongoClient, Db } from "mongodb";
import { AUTH_MONGO_URI, AUTH_DB_NAME } from "../../common/config/env.js";

let client: MongoClient | undefined;
let db: Db | undefined;

export async function connectAuthDb(): Promise<Db> {
  if (db) return db;
  client = new MongoClient(AUTH_MONGO_URI);
  await client.connect();
  db = client.db(AUTH_DB_NAME);
  console.log(`✅ Auth DB connected: ${AUTH_DB_NAME}`);
  return db;
}

export function getAuthDb(): Db {
  if (!db) throw new Error("Auth DB not connected yet");
  return db;
}
