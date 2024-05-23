import { defineConfig } from "drizzle-kit";
import { env } from "./src/env";
export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/schema/index.ts",
  out: "./drizzle",
 dbCredentials: {
  host: "localhost",
  database: "pizza_shop",
  password: "docker",
  user: "docker",
  port: 5432,
  url: env.DATABASE_URL
 }
});