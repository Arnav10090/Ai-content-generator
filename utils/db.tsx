// utils/db.tsx
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "./schema";

// Only use the server-side variable — never expose DB URL to the client
const sql = neon(process.env.DRIZZLE_DB_URL!);
export const db = drizzle({ client: sql, schema });
