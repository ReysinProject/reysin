import type { RouteObject } from "react-router-dom";
import type {Container} from "inversify";
import type React from "react";

export abstract class Application {
	abstract configure(container: Container): Promise<void>;
	abstract getRoutes(): RouteObject[];
	abstract getLayout(): React.ComponentType<{ children: React.ReactNode }>;
}