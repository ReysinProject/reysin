import { build } from "vite";
import { loadConfig } from "../config/config-loader.js";

export async function buildApp() {
	const config = loadConfig();

	await build({
		configFile: false,
		root: process.cwd(),
		base: config.server.base,
		build: {
			outDir: config.server.outDir,
			assetsDir: config.server.assetsDir,
		},
	});

	console.log("Build complete");
}
