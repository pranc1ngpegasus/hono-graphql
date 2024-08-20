import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as dbSchema from "./schema";

export const client = postgres(
  process.env.DATABASE_URL || ""
);
export const db = drizzle(client, {
  logger: true,
  schema: dbSchema,
});
