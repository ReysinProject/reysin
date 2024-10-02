import { Application } from "../core/Application";

export async function loadApps(appNames: string[]): Promise<Application[]> {
	const apps: Application[] = [];

	for (const appName of appNames) {
		try {
			const AppModule = await import(`@/apps/${appName}`);
			if (
				AppModule.default &&
				AppModule.default.prototype instanceof Application
			) {
				apps.push(new AppModule.default());
			} else {
				console.warn(
					`App ${appName} does not export a valid Application instance.`,
				);
			}
		} catch (error) {
			console.error(`Failed to load app ${appName}:`, error);
		}
	}

	return apps;
}
