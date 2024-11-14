import type { ViteDevServer } from "vite";
import type { ReysinConfig } from "../../config/interfaces.js";

export function getServerUrls(server: ViteDevServer, config: ReysinConfig) {
	const networkUrls = server.resolvedUrls?.network || [];
	const localUrl =
		server.resolvedUrls?.local || `http://localhost:${config.server.port}`;

	return {
		network: networkUrls,
		local: localUrl,
	};
}
