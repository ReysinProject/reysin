import type { ReactNode } from "react";
import type { RouteObject } from "react-router-dom";

export class Route {
	path = "";
	loader?: () => Promise<any> | any;
	component(): ReactNode {
		return null;
	}

	public get_config(): RouteObject {
		return {
			path: this.path,
			loader: this.loader,
			Component: this.component,
		};
	}
}
