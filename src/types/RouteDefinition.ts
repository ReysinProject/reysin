import type { ComponentType } from "react";
import type { LayoutProps } from "../core/Router.js";
import type { RouteMeta } from "./RouteMeta.js";

export interface RouteDefinition {
	path: string;
	meta?: RouteMeta;
	layout?: ComponentType<LayoutProps>;
}
