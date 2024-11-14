import type { ReysinConfig } from "../../config/interfaces.js";
import createIndexPlugin from "../../plugins/createIndexPlugin.js";

export function getPluginsConfig(config: ReysinConfig) {
	return [
		createIndexPlugin({
			title: config.app.title || "Reysin App",
			meta: [
				{
					name: "description",
					content: config.app.description || "Reysin application",
				},
			],
			scripts: [{ src: "/src/main.ts", type: "module" }],
		}),
	];
}
