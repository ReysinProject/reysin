import { injectable } from './injectable';

export function transient() {
	return (target: any) => {
		injectable()(target);
		Reflect.defineMetadata('custom:scope', 'transient', target);
	};
}