#!/usr/bin/env node
import { Command } from 'commander';
import { build } from "vite";
import { type ViteDevServer, createServer } from "vite";
import {type FrameworkConfig, loadConfig} from "../utils/config-loader";

export async function startDevServer(): Promise<void> {
	const config: FrameworkConfig = loadConfig();

	let server: ViteDevServer;

	try {
		server = await createServer({
			configFile: false,
			root: process.cwd(),
			server: {
				port: config.vite.port,
			},
			base: config.vite.base,
			build: {
				outDir: config.vite.outDir,
				assetsDir: config.vite.assetsDir,
			},
		});

		await server.listen();
		console.log(`Dev server running at http://localhost:${config.vite.port}`);
	} catch (error) {
		console.error("Failed to start dev server:", error);
		process.exit(1);
	}
}

export async function buildApp() {
	const config = loadConfig();

	await build({
		configFile: false,
		root: process.cwd(),
		base: config.vite.base,
		build: {
			outDir: config.vite.outDir,
			assetsDir: config.vite.assetsDir,
		},
	});

	console.log("Build complete");
}

const program = new Command();

program
	.command('dev')
	.description('Start the development server')
	.action(async () => {
		try {
			await startDevServer();
		} catch (error) {
			console.error('Error starting dev server:', error);
			process.exit(1);
		}
	});

program
	.command('build')
	.description('Build the application')
	.action(async () => {
		try {
			await buildApp();
		} catch (error) {
			console.error('Error building app:', error);
			process.exit(1);
		}
	});


program.parse(process.argv);