import { injectable } from "./injectable.js";

export function singleton() {
	return (target: abstract new (...args: never) => unknown) => {
		injectable()(target);
		Reflect.defineMetadata("custom:scope", "singleton", target);
	};
}
