import type {AppContainer} from "../core/AppContainer.js";
import {loadModules} from "./loadModule.js";
import {Router} from "../core/Router.js";


export async function bootstrapApplication(
	container: AppContainer,
	appPath: string,
): Promise<void> {
	const modules = await loadModules(appPath);

	for (const module of modules) {
		const isInjectable = Reflect.getMetadata("custom:injectable", module);
		if (isInjectable) {
			const scope = Reflect.getMetadata("custom:scope", module) || "transient";
			const binding = container.bind<any>(module);

			if (scope === "singleton") {
				binding.to(module).inSingletonScope();
			} else {
				binding.to(module).inTransientScope();
			}
		}

		const routePath = Reflect.getMetadata("custom:route", module);
		if (routePath) {
			container.get<Router>(Router).addRoute(routePath, module);
		}
	}
}
