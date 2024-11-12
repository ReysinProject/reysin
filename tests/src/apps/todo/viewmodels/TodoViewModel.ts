import { injectable } from "@reysin/project";
import { makeAutoObservable } from "mobx";
import type { TodoItem } from "../models/TodoItem";
import type { TodoService } from "../services/TodoService";

@injectable()
export class TodoViewModel {
	private todoService: TodoService;

	constructor(todoService: TodoService) {
		this.todoService = todoService;
		makeAutoObservable(this);
	}

	get todos(): TodoItem[] {
		return this.todoService.getTodos();
	}

	addTodo(title: string): void {
		this.todoService.addTodo(title);
	}

	toggleTodo(id: number): void {
		this.todoService.toggleTodo(id);
	}
}
