import consola from "consola";
import React from "react";
import { createRoot } from "react-dom/client";
import { loadRoutes } from "../router/loadRoutes.js";
import { RenderApp } from "./RenderApp.js";

export class Reysin {
	private rootElement: HTMLElement | null = null;

	constructor() {
		this.render().then(() => consola.success("Loaded"));
	}

	private async render(): Promise<void> {
		this.rootElement = document.getElementById("root");

		if (!this.rootElement) {
			throw new Error(
				"Root element not found. Make sure the framework is properly initialized.",
			);
		}

		const root = createRoot(this.rootElement);
		const routes = await loadRoutes();

		root.render(<RenderApp routes={routes} />);
		console.log("Reysin framework rendered application");
	}
}
