import type React from "react";
import type { ReactNode } from "react";
import { createRoot } from "react-dom/client";
import {
	type ReysinConfig,
	loadConfigBrowser,
} from "../config/config-loader.js";
import { bootstrapApplication } from "../utils/bootstrapper.js";
import { AppContainer } from "./AppContainer.js";
import { Router } from "./Router.js";

export class Reysin {
	private readonly container: AppContainer;
	private config: ReysinConfig | null = null;
	private rootElement: HTMLElement | null = null;
	private readonly children: ReactNode;

	constructor(
		childrenCallback: (container: AppContainer) => React.JSX.Element,
	) {
		console.log("Reysin framework initializing");
		this.container = new AppContainer();
		this.children = childrenCallback(this.container);
		this.init().then(() => {
			console.log("Reysin framework initialized and rendered");
		});
	}

	private async init(): Promise<void> {
		try {
			await this.initialize();
			this.render();
		} catch (error) {
			console.error("Failed to initialize or render Reysin framework:", error);
		}
	}

	private async initialize(): Promise<void> {
		try {
			this.config = await loadConfigBrowser();
			await this.bootstrap();
			console.log("Reysin framework initialized");
		} catch (error) {
			console.error("Failed to initialize Reysin framework:", error);
			throw error;
		}
	}

	private async bootstrap(): Promise<void> {
		if (!this.config) {
			throw new Error("Configuration not loaded");
		}
		console.log("Reysin framework bootstrapping");
		this.container
			.bind<ReysinConfig>("ReysinConfig")
			.toConstantValue(this.config);
		this.container.bind<Router>("Router").to(Router).inSingletonScope();
		await bootstrapApplication(this.container, this.config.framework.appPath);
		console.log("Reysin framework bootstrapped");

		this.rootElement = document.getElementById(this.config.app.rootElement);
		if (!this.rootElement) {
			throw new Error(
				`Root element with id "${this.config.app.rootElement}" not found`,
			);
		}
	}

	private render(): void {
		if (!this.rootElement) {
			throw new Error(
				"Root element not found. Make sure the framework is properly initialized.",
			);
		}

		const root = createRoot(this.rootElement);
		root.render(this.children);
		console.log("Reysin framework rendered application");
	}
}
