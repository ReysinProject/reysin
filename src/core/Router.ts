import type { AppContainer } from "./AppContainer.js";

export class Router {
	private routes: Map<string, unknown> = new Map();
	// private container: Container;

	constructor(_container: AppContainer) {
		// this.container = container;
		return;
	}

	addRoute(path: string, component: unknown): void {
		this.routes.set(path, component);
	}

	getRoutes(): Map<string, unknown> {
		return this.routes;
	}

	generateRoutes() {
		// Implémentation pour générer les routes React
	}
}
