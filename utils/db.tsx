import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";
import * as schema from "./schema";

config({ path: ".env" }); // or .env.local

// Use server-side variable for API routes, fallback to client-side for client components
const sql = neon(process.env.DRIZZLE_DB_URL || process.env.NEXT_PUBLIC_DRIZZLE_DB_URL!);
export const db = drizzle({ client: sql, schema });
