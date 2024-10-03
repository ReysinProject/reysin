import { injectable as inversifyInjectable } from "inversify";
import "reflect-metadata";

export function injectable() {
	return (target: abstract new (...args: never) => unknown) => {
		inversifyInjectable()(target);
		Reflect.defineMetadata("custom:injectable", true, target);
	};
}
