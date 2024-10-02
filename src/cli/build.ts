import { loadConfig } from "@/config/config-loader";
import { build } from "vite";

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
