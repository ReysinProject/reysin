import { AppContainer } from "./AppContainer.js";
import { bootstrapApplication } from "../utils/bootstrapper.js";
import type { ReactNode } from "react";
import { createRoot } from 'react-dom/client';
import { loadConfigBrowser, type ReysinConfig } from "../config/config-loader.js";

export class Reysin {
	private container: AppContainer;
	private config: ReysinConfig | null = null;
	private rootElement: HTMLElement | null = null;
	private children: ReactNode;

	constructor(children: ReactNode) {
		console.log('Reysin framework initializing');
		this.container = new AppContainer();
		this.children = children;
		this.init();
	}

	private async init(): Promise<void> {
		try {
			await this.initialize();
			this.render();
		} catch (error) {
			console.error('Failed to initialize or render Reysin framework:', error);
		}
	}

	private async initialize(): Promise<void> {
		try {
			this.config = await loadConfigBrowser();
			await this.bootstrap();
			console.log('Reysin framework initialized');
		} catch (error) {
			console.error('Failed to initialize Reysin framework:', error);
			throw error;
		}
	}

	private async bootstrap(): Promise<void> {
		if (!this.config) {
			throw new Error('Configuration not loaded');
		}
		console.log('Reysin framework bootstrapping');
		await bootstrapApplication(this.container, this.config.framework.appPath);
		console.log('Reysin framework bootstrapped');

		this.rootElement = document.getElementById(this.config.app.rootElement);
		if (!this.rootElement) {
			throw new Error(`Root element with id "${this.config.app.rootElement}" not found`);
		}
	}

	private render(): void {
		if (!this.rootElement) {
			throw new Error('Root element not found. Make sure the framework is properly initialized.');
		}

		const root = createRoot(this.rootElement);
		root.render(this.children);
		console.log('Reysin framework rendered application');
	}
}