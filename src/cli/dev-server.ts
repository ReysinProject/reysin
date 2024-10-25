import { type ViteDevServer, createServer } from "vite";
import { type ReysinConfig, loadConfig } from "../utils/config-loader.js";

export async function startDevServer(): Promise<void> {
	const config: ReysinConfig = loadConfig();

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
