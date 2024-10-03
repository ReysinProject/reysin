import { makeAutoObservable } from "mobx";
import { z } from "zod";

export abstract class BaseModel<T extends z.ZodType> {
	protected schema: T;
	protected data: z.infer<T>;

	protected constructor(schema: T, initialData?: Partial<z.infer<T>>) {
		this.schema = schema;
		this.data = this.schema.parse(initialData || {});
		makeAutoObservable(this);
	}

	public toJSON(): z.infer<T> {
		return { ...this.data };
	}

	public update(newData: Partial<z.infer<T>>): void {
		Object.assign(this.data, this.schema.parse({ ...this.data, ...newData }));
	}

	public validate(): boolean {
		try {
			this.schema.parse(this.data);
			return true;
		} catch (error) {
			console.error("Validation error:", error);
			return false;
		}
	}

	public getValidationErrors(): z.ZodError | null {
		try {
			this.schema.parse(this.data);
			return null;
		} catch (error) {
			if (error instanceof z.ZodError) {
				return error;
			}
			throw error;
		}
	}

	public reset(data?: Partial<z.infer<T>>): void {
		this.data = this.schema.parse(data || {});
	}

	protected get<K extends keyof z.infer<T>>(key: K): z.infer<T>[K] {
		return this.data[key];
	}

	protected set<K extends keyof z.infer<T>>(
		key: K,
		value: z.infer<T>[K],
	): void {
		this.update({ [key]: value } as Partial<z.infer<T>>);
	}

	public static fromJSON<S extends z.ZodType, M extends BaseModel<S>>(
		ModelClass: new (schema: S) => M,
		schema: S,
		data: z.infer<S>,
	): M {
		const instance = new ModelClass(schema);
		instance.update(data);
		return instance;
	}
}
