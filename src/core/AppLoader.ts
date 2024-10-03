import type { Container } from "./Container.js";
import { Application } from "./Application.js";
import type { ReysinConfig } from "../config/config-loader.js";
import fs from "node:fs/promises";
import path from "node:path";

type AppModule = {
	default: new () => Application;
};

export class AppLoader {
	private apps: Application[] = [];

	constructor(private container: Container, private config: ReysinConfig) {}

	async loadApps(): Promise<void> {
		console.log(this.config);

		for (const appName of this.config.framework.apps) {
			const appPath = path.join(process.cwd(), 'src', 'apps', appName, 'index.ts');

			try {
				// Check if the file exists
				await fs.access(appPath);

				// Dynamically import the app
				const module = await import(appPath) as AppModule;
				const AppClass = module.default;

				if (AppClass.prototype instanceof Application) {
					const app = this.container.get<Application>(AppClass);
					await app.configure(this.container);
					this.apps.push(app);
				} else {
					console.warn(`App ${appName} does not extend Application class.`);
				}
			} catch (error) {
				console.error(`Failed to load app ${appName}:`, error);
			}
		}
	}

	getApps(): Application[] {
		return this.apps;
	}
}