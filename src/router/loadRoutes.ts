import {RouteModule} from "./interfaces.js";

export async function loadRoutes() {
	const routeFiles = import.meta.glob("/src/apps/**/routes/**.{ts,tsx}");
	const routes = [];

	for (const path in routeFiles) {
		const module = await routeFiles[path]();
		const routeInstance = new (module as RouteModule).default();
		routes.push(routeInstance.get_config());
	}

	return routes;
}
