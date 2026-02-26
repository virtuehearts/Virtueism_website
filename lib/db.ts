import Database from "better-sqlite3";
import { drizzle, BetterSQLite3Database } from "drizzle-orm/better-sqlite3";
import * as schema from "./schema";
import { normalizeEnv } from "./utils";
import path from "path";

const rawDbPath = normalizeEnv(process.env.DATABASE_URL)?.replace('file:', '') || 'dev.db';
const dbPath = path.isAbsolute(rawDbPath) ? rawDbPath : path.resolve(process.cwd(), rawDbPath);
const sqlite = new Database(dbPath);

const globalForDrizzle = global as unknown as { db: BetterSQLite3Database<typeof schema> };

export const db = globalForDrizzle.db || drizzle(sqlite, { schema });

if (process.env.NODE_ENV !== "production") globalForDrizzle.db = db;
