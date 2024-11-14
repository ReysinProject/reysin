import consola from "consola";
import { type ViteDevServer, createServer } from "vite";
import { type ReysinConfig, loadConfig } from "../utils/config-loader.js";

export async function startDevServer(): Promise<void> {
	consola.start("Starting get the config");
	const config: ReysinConfig = loadConfig();
	consola.success("Config loaded");

	let server: ViteDevServer;

	consola.start("Starting dev server");
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
		consola.success("Dev server started successfully");
		consola.box([
			"Dev server started successfully",
			`started at http://localhost:${config.vite.port}`,
		]);
	} catch (error) {
		consola.error("Dev server failed to start");
		consola.error(
			"If the issue persists, please report it at https://github.com/ReysinProject/reysin/issues",
		);
		process.exit(1);
	}
}
