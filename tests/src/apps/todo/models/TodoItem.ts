import { BaseModel } from "@reysin/project";
import { z } from "zod";

const TodoItemSchema = z.object({
	id: z.number(),
	title: z.string(),
	completed: z.boolean(),
});

export class TodoItem extends BaseModel<typeof TodoItemSchema> {
	constructor(initialData?: Partial<z.infer<typeof TodoItemSchema>>) {
		super(TodoItemSchema, initialData);
	}

	get id() {
		return this.get("id");
	}
	get title() {
		return this.get("title");
	}
	set title(value: string) {
		this.set("title", value);
	}
	get completed() {
		return this.get("completed");
	}
	set completed(value: boolean) {
		this.set("completed", value);
	}
}
