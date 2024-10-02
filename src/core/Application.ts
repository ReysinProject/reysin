import {Container} from "./Container";
import {bootstrapApplication} from "../utils/bootstrapper";

export class Application {
	private readonly container: Container;

	constructor() {
		this.container = new Container();
	}

	async bootstrap(appPath: string): Promise<void> {
		await bootstrapApplication(this.container, appPath);
	}

	getContainer(): Container {
		return this.container;
	}

	start(): void {
		console.log("Application started");
	}
}
