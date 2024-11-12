// import React, { useState } from "react";
// import { observer } from "@reysin/project";
// import { TodoViewModel } from "../viewmodels/TodoViewModel";
//
// interface TodoListProps {
// 	viewModel: TodoViewModel;
// }
//
// export const TodoList: React.FC<TodoListProps> = observer(({ viewModel }) => {
// 	const [newTodoTitle, setNewTodoTitle] = useState("");
//
// 	const handleAddTodo = () => {
// 		if (newTodoTitle.trim()) {
// 			viewModel.addTodo(newTodoTitle.trim());
// 			setNewTodoTitle("");
// 		}
// 	};
//
// 	return (
// 		<div>
// 			<h1>Todo List</h1>
// 			<div>
// 				<input
// 					type="text"
// 					value={newTodoTitle}
// 					onChange={(e) => setNewTodoTitle(e.target.value)}
// 					placeholder="New todo title"
// 				/>
// 				<button onClick={handleAddTodo}>Add Todo</button>
// 			</div>
// 			<ul>
// 				{viewModel.todos.map((todo) => (
// 					<li key={todo.id}>
// 						<input
// 							type="checkbox"
// 							checked={todo.completed}
// 							onChange={() => viewModel.toggleTodo(todo.id)}
// 						/>
// 						<span style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
//               {todo.title}
//             </span>
// 					</li>
// 				))}
// 			</ul>
// 		</div>
// 	);
// });
