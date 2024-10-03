import type { RouteObject } from "react-router-dom";
import type React from "react";
import type {Container} from "./Container.js";

export abstract class Application {
	abstract configure(container: Container): Promise<void>;
	abstract getRoutes(): RouteObject[];
	abstract getLayout(): React.ComponentType<{ children: React.ReactNode }>;
}