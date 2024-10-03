import {Container} from "./Container.js";
import {bootstrapApplication} from "../utils/bootstrapper.js";
import type {ReactNode} from "react";
import { createRoot } from 'react-dom/client';
import {loadConfig, type ReysinConfig} from "../config/config-loader.js";

export class Reysin {
	private container: Container;
	private config: ReysinConfig

	constructor() {
		console.log('Reysin framework initialized');
		this.container = new Container();
		this.config = loadConfig();
		this.bootstrap()
	}

	bootstrap() {
    console.log('Reysin framework bootstrapped');
		bootstrapApplication(this.container, "todo").then(() => {
			console.log('Reysin framework initialized');
		})
  }

	render(children: ReactNode) {
		const rootElement = document.getElementById(this.config.app.rootElement);
		if (!rootElement) {
			throw new Error(`Root element with id "${this.config.app.rootElement}" not found`);
		}
		const root = createRoot(rootElement);
		root.render(children);
	}
}