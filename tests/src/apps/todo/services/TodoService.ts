import { injectable, singleton } from "@reysin/project";
import { TodoItem } from "../models/TodoItem";

@singleton()
export class TodoService {
	private todos: TodoItem[] = [];

	addTodo(title: string): void {
		const newTodo = new TodoItem({
			id: Date.now(),
			title,
			completed: false,
		});
		this.todos.push(newTodo);
	}

	getTodos(): TodoItem[] {
		return this.todos;
	}

	toggleTodo(id: number): void {
		const todo = this.todos.find((t) => t.id === id);
		if (todo) {
			todo.completed = !todo.completed;
		}
	}
}
