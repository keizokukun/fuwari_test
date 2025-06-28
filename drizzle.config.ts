import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  driver: "d1-http", 
  dialect: "sqlite",
  dbCredentials: {
    url: ".wrangler\state\v3\d1\miniflare-D1DatabaseObject\c6c7d7ad7aaa8c5d15cb9804a6b4ad87e55773279166f213983085015cd8f2ba.sqlite",
  },
});