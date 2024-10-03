export function routable() {
	return (target: object) => {
		Reflect.defineMetadata("custom:routable", true, target);
	};
}
