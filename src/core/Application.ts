import type { RouteObject } from "react-router-dom";
import type React from "react";
import type {AppContainer} from "./AppContainer.js";

export abstract class Application {
	abstract configure(container: AppContainer): Promise<void>;
	abstract getRoutes(): RouteObject[];
	abstract getLayout(): React.ComponentType<{ children: React.ReactNode }>;
}