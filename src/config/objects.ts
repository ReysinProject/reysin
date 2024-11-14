import type { ReysinConfig } from "../interfaces/config.js";

export const defaultReysinConfig: ReysinConfig = {
	app: {
		title: "MVVM App",
		description: "Built with MVVM Framework",
	},
	server: {
		port: 3000,
		base: "/",
		outDir: "dist",
		assetsDir: "assets",
		host: false,
	},
	framework: {
		appPath: "/src/apps",
		apps: [],
	},
};
