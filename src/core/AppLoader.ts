import type {Container} from "inversify";
import {Application} from "./Application.js";

export class AppLoader {
	private apps: Application[] = [];

	constructor(private container: Container) {}

	async loadApps(): Promise<void> {
		const appContext = import.meta.glob("/src/apps/*/index.ts");

		for (const path in appContext) {
			const module = await appContext[path]();
			const AppClass = module.default;

			if (AppClass.prototype instanceof Application) {
				const app = this.container.resolve<Application>(AppClass);
				await app.configure(this.container);
				this.apps.push(app);
			}
		}
	}

	getApps(): Application[] {
		return this.apps;
	}
}