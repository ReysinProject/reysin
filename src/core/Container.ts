import { Container as InversifyContainer, type interfaces } from "inversify";

export class Container {
	private container: InversifyContainer;

	constructor() {
		this.container = new InversifyContainer();
	}

	bind<T>(
		serviceIdentifier: interfaces.ServiceIdentifier<T>,
	): interfaces.BindingToSyntax<T> {
		return this.container.bind<T>(serviceIdentifier);
	}

	get<T>(serviceIdentifier: interfaces.ServiceIdentifier<T>): T {
		return this.container.get<T>(serviceIdentifier);
	}
}
