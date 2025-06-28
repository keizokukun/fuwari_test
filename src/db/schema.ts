import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";

export const comments = sqliteTable("comments", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  author: text("author"),
  content: text("content"),
  post_slug: text("post_slug"),
  post_date: text("post_date"),
});
