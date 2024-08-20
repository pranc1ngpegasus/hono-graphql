import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { logger } from "hono/logger";

const app = new Hono();
app.use(logger());

app.get("/healthcheck", (c) => c.text("ok"));

serve(app, (info) => {
	console.log(`Server is running on http://localhost:${info.port}/`);
});
