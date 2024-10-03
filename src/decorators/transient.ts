import { injectable } from "./injectable.js";

export function transient() {
	return (target: abstract new (...args: never) => unknown) => {
		injectable()(target);
		Reflect.defineMetadata("custom:scope", "transient", target);
	};
}
