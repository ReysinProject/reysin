import type { ReysinConfig } from "../../interfaces/config.js";

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
