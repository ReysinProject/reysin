import type { RouteDefinition } from "../types/RouteDefinition.js";

export function defineRoute(routeDefinition: RouteDefinition) {
	return (target: object) => {
		Reflect.defineMetadata("custom:route", routeDefinition, target);
	};
}
