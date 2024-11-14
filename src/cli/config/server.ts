import type { ReysinConfig } from "../../interfaces/config.js";

export function getServerConfig(config: ReysinConfig) {
	return {
		port: config.server.port,
		host: config.server.host,
	};
}
