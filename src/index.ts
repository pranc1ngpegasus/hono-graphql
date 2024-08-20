import * as fs from "node:fs";
import * as path from "path";
import { type RootResolver, graphqlServer } from "@hono/graphql-server";
import { serve } from "@hono/node-server";
import { buildSchema } from "graphql";
import { Hono } from "hono";
import { logger } from "hono/logger";

function loadSchemaFiles(dir: string) {
	const schemaFiles = fs
		.readdirSync(path.join(__dirname, dir))
		.filter((file) => file.endsWith(".graphql"));

	return schemaFiles
		.map((file) => {
			const filePath = path.join(dir, file);
			return fs.readFileSync(path.join(__dirname, filePath), "utf-8");
		})
		.join("\n");
}

const app = new Hono();
app.use(logger());

const rootResolver: RootResolver = (_) => {
	return {
		greet: () => "Hello, World!",
	};
};

app.get("/healthcheck", (c) => c.text("ok"));
app.use(
	"/graphql",
	graphqlServer({
		schema: buildSchema(loadSchemaFiles("../schema")),
		rootResolver: rootResolver,
		graphiql: true,
	}),
);

serve(app, (info) => {
	console.log(`Server is running on http://localhost:${info.port}/`);
});
