// drizzle.config.ts
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./utils/schema.tsx",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://neondb_owner:npg_eGR23HKfprJV@ep-dry-sky-a86xzc6w-pooler.eastus2.azure.neon.tech/AI-content-Generator?sslmode=require"
  }
});
