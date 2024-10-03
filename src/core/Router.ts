import type {Container} from "./Container.js";

export class Router {
	private routes: Map<string, any> = new Map();
	// private container: Container;

	constructor(_container: Container) {
		// this.container = container;
	}

	addRoute(path: string, component: any): void {
		this.routes.set(path, component);
	}

	getRoutes(): Map<string, any> {
		return this.routes;
	}

	generateRoutes() {
		// Implémentation pour générer les routes React
	}
}