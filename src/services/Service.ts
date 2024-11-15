export class Service<T extends new (...args: unknown[]) => object> {
	private static instance: InstanceType<
		abstract new (
			...args: unknown[]
		) => object
	>;

	private constructor(private readonly ctor: T) {}

	static load<T extends { new (...args: unknown[]): object }>(ctor: T): object {
		if (!Service.instance) {
			Service.instance = new Service(ctor).getInstance();
		}
		return Service.instance;
	}

	private getInstance(): InstanceType<T> {
		return new this.ctor() as InstanceType<T>;
	}
}
