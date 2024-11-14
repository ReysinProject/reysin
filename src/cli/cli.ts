#!/usr/bin/env node
import { Command } from "commander";
import { buildApp } from "./build.js";
import { startDevServer } from "./dev-server.js";

const program = new Command();

program
	.command("dev")
	.description("Start the development server")
	.action(async () => {
		try {
			await startDevServer();
		} catch (error) {
			console.error("Error starting dev server:", error);
			process.exit(1);
		}
	});

program
	.command("build")
	.description("Build the application")
	.action(async () => {
		try {
			await buildApp();
		} catch (error) {
			console.error("Error building app:", error);
			process.exit(1);
		}
	});

export default program;
