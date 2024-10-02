export function route(path: string) {
	return (target: any) => {
		Reflect.defineMetadata('custom:route', path, target);
	};
}