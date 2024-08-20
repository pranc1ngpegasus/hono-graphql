import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as dbSchema from "./schema";

export const client = postgres(
	"postgres://postgres:password@localhost:5432/default",
);
export const db = drizzle(client, {
	logger: true,
	schema: dbSchema,
});
