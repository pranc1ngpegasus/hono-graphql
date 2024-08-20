import { pgTable, uuid } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
	id: uuid("id").defaultRandom().primaryKey(),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
