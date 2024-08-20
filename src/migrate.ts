import { exit } from "node:process";
import * as path from "path";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import { db } from "./database";

const main = async () => {
	await migrate(db, {
		migrationsFolder: path.join(__dirname, "../drizzle"),
	});
};

main()
	.then(() => {
		console.log("Migration complete");
		exit(0);
	})
	.catch((e) => {
		console.error(e);
		exit(1);
	});
