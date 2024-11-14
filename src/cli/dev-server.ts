import consola from "consola";
import { type ViteDevServer, createServer } from "vite";
import { loadConfig } from "../config/config-loader.js";
import type { ReysinConfig } from "../config/interfaces.js";
import { getBuildConfig } from "./config/build.js";
import { getPluginsConfig } from "./config/plugins.js";
import { getServerConfig } from "./config/server.js";
import { getServerUrls } from "./utils/getServerUrls.js";

export async function startDevServer(): Promise<void> {
	try {
		consola.start("Loading configuration...");
		const config: ReysinConfig = loadConfig();
		consola.success("Configuration loaded successfully");

		consola.start("Creating dev server...");
		const server: ViteDevServer = await createServer({
			configFile: false,
			root: process.cwd(),
			server: getServerConfig(config),
			base: config.server.base || "/",
			build: getBuildConfig(config),
			plugins: getPluginsConfig(config),
			optimizeDeps: {
				include: ["consola"],
				exclude: [],
			},
		});

		await server.listen();

		const urls = getServerUrls(server, config);

		consola.success("Dev server started successfully");
		consola.box(
			`🚀 Server running at:\n  ➜ Local:   ${urls.local}\n  ➜ Network: ${urls.network[0] || "unavailable"}`,
		);
	} catch (error) {
		consola.error("Failed to start dev server:", error);
		consola.error(
			"If the issue persists, please report it at https://github.com/ReysinProject/reysin/issues",
		);
		process.exit(1);
	}
}
