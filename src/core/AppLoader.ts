import type { Container } from "./Container.js";
import { Application } from "./Application.js";
import type {ReysinConfig} from "../config/config-loader.js";

export class AppLoader {
	private apps: Application[] = [];

	constructor(private container: Container, private config: ReysinConfig) {}

	async loadApps(): Promise<void> {
		const appModules = this.config.framework.apps.map((importApp) => import(`../apps/${importApp}/index.js`));

		for (const importApp of appModules) {
			try {
				const module = await (await importApp)();
				const AppClass = module.default;

				if (AppClass.prototype instanceof Application) {
					const app = this.container.get<Application>(AppClass);
					await app.configure(this.container);
					this.apps.push(app);
				}
			} catch (error) {
				console.error("Failed to load app:", error);
			}
		}
	}

	getApps(): Application[] {
		return this.apps;
	}
}