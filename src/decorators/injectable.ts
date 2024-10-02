import { injectable as inversifyInjectable } from 'inversify';
import 'reflect-metadata';

export function injectable() {
	return (target: any) => {
		inversifyInjectable()(target);
		Reflect.defineMetadata('custom:injectable', true, target);
	};
}