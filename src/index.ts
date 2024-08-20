import { graphqlServer } from "@hono/graphql-server";
import { serve } from "@hono/node-server";
import { buildSchema } from "drizzle-graphql";
import { Hono } from "hono";
import { logger } from "hono/logger";
import { db } from "./database";
const { schema } = buildSchema(db);

const app = new Hono();
app.use(logger());

app.get("/healthcheck", (c) => c.text("ok"));
app.use(
	"/graphql",
	graphqlServer({
		schema,
		graphiql: true,
	}),
);

serve(app, (info) => {
	console.log(`Server is running on http://localhost:${info.port}/`);
});
