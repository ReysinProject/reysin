import fs from "node:fs";
import path from "node:path";
import yaml from "js-yaml";

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
		apps: string[];
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
		apps: [],
	},
};

export function loadConfig(): ReysinConfig {
	const configPath = path.resolve(process.cwd(), "reysin.config.yaml");

	if (fs.existsSync(configPath)) {
		const fileContents = fs.readFileSync(configPath, "utf8");
		const userConfig = yaml.load(fileContents) as Partial<ReysinConfig>;
		return { ...defaultConfig, ...userConfig };
	}

	return defaultConfig;
}

export async function loadConfigBrowser(): Promise<ReysinConfig> {
	const configFiles = import.meta.glob("/reysin.config.yaml", {
		query: "?raw",
	});

	try {
		const configModule = Object.values(configFiles)[0];
		if (!configModule) {
			throw new Error("Config file not found");
		}
		const yamlText = await configModule();
		const userConfig = yaml.load(yamlText as string) as Partial<ReysinConfig>;
		return { ...defaultConfig, ...userConfig };
	} catch (error) {
		console.warn("Failed to load config file, using default config:", error);
		return defaultConfig;
	}
}
