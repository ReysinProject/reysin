export class ServiceLoader<T extends new (...args: unknown[]) => object> {
	private static instance: InstanceType<
		abstract new (
			...args: unknown[]
		) => object
	>;

	private constructor(private readonly ctor: T) {}

	static load<T extends { new (...args: unknown[]): object }>(ctor: T): object {
		if (!ServiceLoader.instance) {
			ServiceLoader.instance = new ServiceLoader(ctor).getInstance();
		}
		return ServiceLoader.instance;
	}

	private getInstance(): InstanceType<T> {
		return new this.ctor() as InstanceType<T>;
	}
}
