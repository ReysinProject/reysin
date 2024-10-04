import type { AppContainer } from "../core/AppContainer.js";
import { Router } from "../core/Router.js";
import type { RouteDefinition } from "../types/RouteDefinition.js";
import { loadModules } from "./loadModule.js";

type Scope = "singleton" | "transient";

function getMetadata<T>(key: string, target: object): T | undefined {
	return Reflect.getMetadata(key, target) as T | undefined;
}

export async function bootstrapApplication(
	container: AppContainer,
	appPath: string,
): Promise<void> {
	const modules = await loadModules(appPath);
	const router = container.get<Router>(Router);

	for (const module of modules) {
		const isInjectable = getMetadata<boolean>("custom:injectable", module);
		if (isInjectable) {
			const scope = getMetadata<Scope>("custom:scope", module) ?? "transient";
			const binding = container.bind<InstanceType<typeof module>>(module);

			if (scope === "singleton") {
				binding.to(module).inSingletonScope();
			} else {
				binding.to(module).inTransientScope();
			}
		}

		const routeDefinition = getMetadata<RouteDefinition>(
			"custom:route",
			module,
		);
		if (routeDefinition) {
			router.addRoute(
				routeDefinition.path,
				routeDefinition.render,
				routeDefinition,
			);
		}
	}
}
