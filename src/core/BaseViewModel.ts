import { makeAutoObservable } from 'mobx';

export abstract class BaseViewModel {
	protected constructor() {
		makeAutoObservable(this);
	}
}