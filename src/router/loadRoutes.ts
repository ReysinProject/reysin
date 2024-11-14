import type { RouteModule, RouteObject } from "../interfaces/routes.js";

export async function loadRoutes() {
	const routeFiles = import.meta.glob("/src/apps/**/router.{ts,tsx}");
	let routes: RouteObject[] = [];

	for (const path in routeFiles) {
		const module = await routeFiles[path]();
		const routeInstance = (module as RouteModule).default;
		routes = [...routes, ...routeInstance];
	}

	return routes;
}
