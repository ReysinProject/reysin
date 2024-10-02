import fs from "node:fs";
import path from "path";
import yaml from "js-yaml";

export interface FrameworkConfig {
	app: {
		title: string;
		description: string;
		rootElement: string;
	};
	vite: {
		port: number;
		base: string;
		outDir: string;
		assetsDir: string;
	};
	framework: {
		apps: string[];
		apiPath: string;
	};
}

export function loadConfig(): FrameworkConfig {
	const configPath = path.resolve(process.cwd(), "reysin.config.yaml");
	const fileContents = fs.readFileSync(configPath, "utf8");
	return yaml.load(fileContents) as FrameworkConfig;
}
