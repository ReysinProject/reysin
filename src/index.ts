#!/usr/bin/env node
import {startDevServer} from "./cli/dev-server";

export { Application } from "./core/Application";
export { Router } from "./core/Router";
export { Container } from "./core/Container";
export { BaseViewModel } from "./core/BaseViewModel";
export { BaseService } from "./core/BaseService";
export { BaseModel } from "./core/BaseModel";
export { injectable } from "./decorators/injectable";
export { singleton } from "./decorators/singleton";
export { transient } from "./decorators/transient";
export { route } from "./decorators/route";
export { observer } from "./decorators/observer";
import { Command } from 'commander';
import {buildApp} from "./cli/build";

const program = new Command();

program
	.command('dev')
	.description('Start the development server')
	.action(async () => {
		try {
			await startDevServer();
		} catch (error) {
			console.error('Error starting dev server:', error);
			process.exit(1);
		}
	});

program
	.command('build')
	.description('Build the application')
	.action(async () => {
		try {
			await buildApp();
		} catch (error) {
			console.error('Error building app:', error);
			process.exit(1);
		}
	});


program.parse(process.argv);