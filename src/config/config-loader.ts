import fs from "node:fs";
import path from "node:path";
import yaml from "js-yaml";
import {mergeDeep} from "../utils/object-utils.js";

export interface ReysinConfig {
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
		appPath: string;
	};
}

const defaultConfig: ReysinConfig = {
	app: {
		title: "MVVM App",
		description: "Built with MVVM Framework",
		rootElement: "root",
	},
	vite: {
		port: 3000,
		base: "/",
		outDir: "dist",
		assetsDir: "assets",
	},
	framework: {
		appPath: "/src/apps",
	},
};

export function loadConfig(): ReysinConfig {
	const configPath = path.resolve(process.cwd(), "reysin.config.yaml");

	if (fs.existsSync(configPath)) {
		const fileContents = fs.readFileSync(configPath, "utf8");
		const userConfig = yaml.load(fileContents) as Partial<ReysinConfig>;
		return mergeDeep(defaultConfig, userConfig) as ReysinConfig;
	}

	return defaultConfig;
}

export async function loadConfigBrowser(): Promise<ReysinConfig> {
	try {
		const response = await fetch('/reysin.config.yaml');
		if (!response.ok) {
			throw new Error('Config file not found');
		}
		const yamlText = await response.text();
		const userConfig = yaml.load(yamlText) as Partial<ReysinConfig>;
		return mergeDeep(defaultConfig, userConfig) as ReysinConfig;
	} catch (error) {
		console.warn('Failed to load config file, using default config:', error);
		return defaultConfig;
	}
}