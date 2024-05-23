import { defineConfig } from "drizzle-kit";
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
  url: "postgresql://docker:docker@localhost:5432/pizza_shop"
 }
});