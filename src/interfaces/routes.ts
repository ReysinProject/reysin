import type React from "react";

export interface RouteObject {
	path: string;
	component: React.LazyExoticComponent<React.ComponentType<unknown>>;
	layout?: React.ComponentType;
	prefetch?: () => Promise<unknown>;
}

export type RouteModule = {
	default: RouteObject[];
};
