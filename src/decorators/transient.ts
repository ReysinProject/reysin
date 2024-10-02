import {injectable} from "./injectable.js";

export function transient() {
	return (target: any) => {
		injectable()(target);
		Reflect.defineMetadata("custom:scope", "transient", target);
	};
}
