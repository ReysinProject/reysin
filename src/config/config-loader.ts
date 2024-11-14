import fs from "node:fs";
import path from "node:path";
import yaml from "js-yaml";
import type { ReysinConfig } from "./interfaces.js";
import { defaultReysinConfig } from "./objects.js";

export function loadConfig(): ReysinConfig {
	const configPath = path.resolve(process.cwd(), "reysin.config.yaml");

	if (fs.existsSync(configPath)) {
		const fileContents = fs.readFileSync(configPath, "utf8");
		const userConfig = yaml.load(fileContents) as Partial<ReysinConfig>;
		return { ...defaultReysinConfig, ...userConfig };
	}

	return defaultReysinConfig;
}
