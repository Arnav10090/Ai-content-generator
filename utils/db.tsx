// utils/db.tsx
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "./schema";

if (!process.env.DRIZZLE_DB_URL) {
  throw new Error('DRIZZLE_DB_URL environment variable is not set');
}

const sql = neon(process.env.DRIZZLE_DB_URL);
export const db = drizzle({ client: sql, schema });