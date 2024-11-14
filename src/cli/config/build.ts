import type { ReysinConfig } from "../../config/interfaces.js";

export function getBuildConfig(config: ReysinConfig) {
	return {
		outDir: config.server.outDir || "dist",
		assetsDir: config.server.assetsDir || "assets",
		emptyOutDir: true,
		rollupOptions: {
			input: "/src/main.ts",
		},
	};
}
