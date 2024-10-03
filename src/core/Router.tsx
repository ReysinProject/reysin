import { injectable } from "inversify";
import React from "react";
import type { ComponentType, FC, ReactElement, ReactNode } from "react";
import type { RouteObject } from "react-router-dom";
import type { RouteDefinition } from "../types/RouteDefinition.js";
import type { ModuleType } from "../utils/loadModule.js";

export interface LayoutProps {
	children: ReactNode;
}

@injectable()
export class Router {
	private routes: Map<string, RouteObject> = new Map();

	addRoute(
		path: string,
		Module: ModuleType,
		definition: RouteDefinition,
	): void {
		console.log(path);
		console.log(Module);
		console.log(definition);
		const ComponentWrapper: FC = () => {
			const ModuleComponent = Module as unknown as ComponentType;
			return <ModuleComponent />;
		};

		const routeObject: RouteObject = {
			path,
			element: this.wrapWithLayout(ComponentWrapper, definition.layout),
		};

		if (definition.meta) {
			(routeObject as RouteObject & { meta?: RouteDefinition["meta"] }).meta =
				definition.meta;
		}

		this.routes.set(path, routeObject);
	}

	getRoutes(): RouteObject[] {
		return Array.from(this.routes.values());
	}

	private wrapWithLayout(
		Component: ComponentType,
		Layout?: ComponentType<LayoutProps>,
	): ReactElement {
		if (!Layout) {
			return <Component />;
		}
		return (
			<Layout>
				<Component />
			</Layout>
		);
	}

	applyMetaData(path: string): void {
		const route = this.routes.get(path);
		if (!route || !("meta" in route)) return;

		const meta = (route as RouteObject & { meta?: RouteDefinition["meta"] })
			.meta;
		if (!meta) return;

		if (meta.title) {
			document.title = meta.title;
		}

		if (meta.description) {
			this.updateMetaTag("description", meta.description);
		}

		if (meta.favicon) {
			this.updateLinkTag("icon", meta.favicon);
		}
	}

	private updateMetaTag(name: string, content: string): void {
		let tag = document.querySelector(`meta[name="${name}"]`);
		if (!tag) {
			tag = document.createElement("meta");
			tag.setAttribute("name", name);
			document.head.appendChild(tag);
		}
		tag.setAttribute("content", content);
	}

	private updateLinkTag(rel: string, href: string): void {
		let tag = document.querySelector(`link[rel="${rel}"]`);
		if (!tag) {
			tag = document.createElement("link");
			tag.setAttribute("rel", rel);
			document.head.appendChild(tag);
		}
		tag.setAttribute("href", href);
	}
}
