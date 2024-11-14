import type { ReysinConfig } from "../../config/interfaces.js";

export function getServerConfig(config: ReysinConfig) {
	return {
		port: config.server.port,
		host: config.server.host,
	};
}
