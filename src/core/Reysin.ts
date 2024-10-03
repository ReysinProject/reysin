import { AppContainer } from "./AppContainer.js";
import { bootstrapApplication } from "../utils/bootstrapper.js";
import type { ReactNode } from "react";
import { createRoot } from 'react-dom/client';
import {loadConfigBrowser, type ReysinConfig} from "../config/config-loader.js";

export class Reysin {
	private container: AppContainer;
	private config: ReysinConfig | null = null;

	constructor(children: ReactNode) {
		console.log('Reysin framework initializing');
		this.container = new AppContainer();
		this.initialize().then(( ) => {
			this.render(children)
		})
	}

	async initialize(): Promise<void> {
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
	}

	render(children: ReactNode): void {
		if (!this.config) {
			throw new Error('Reysin framework not initialized');
		}
		const rootElement = document.getElementById(this.config.app.rootElement);
		if (!rootElement) {
			throw new Error(`Root element with id "${this.config.app.rootElement}" not found`);
		}
		const root = createRoot(rootElement);
		root.render(children);
	}
}