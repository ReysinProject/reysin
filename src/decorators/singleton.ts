import {injectable} from "./injectable.js";

export function singleton() {
	return (target: any) => {
		injectable()(target);
		Reflect.defineMetadata("custom:scope", "singleton", target);
	};
}
