
import { useEffect, useState } from 'react';
import TodoCollection from '../backend/database/TodoCollection';
import Todo from '../core/Todo';
import { User } from 'firebase/auth';

interface useTodosReturnTypes {
	todos: Todo[];
	addTodo: (todo: string) => void;
	deleteTodo: (todo: Todo) => void;
	updateTodo: (todo: Todo) => void;
}

const useTodos = (user: User | null): useTodosReturnTypes => {
	const dataCollection = new TodoCollection();
	const [todos, setTodos] = useState<Todo[]>([]);

	useEffect(() => {
		getTodos();
	}, []);

	const getTodos = () => {
		dataCollection.getAll(user?.uid || '').then(todos => setTodos(todos));
	};

	const addTodo = (todo: string) => {
		try {
			const todoObj = new Todo(user?.uid || '', todo, false, new Date());
			dataCollection.save(todoObj, user).then(promiseReturn => {
				if (promiseReturn !== true) {
					console.error(promiseReturn);
					return;
				}
	
				getTodos();
			});
		} catch (e) {
			console.log(e);
		}
	};

	const deleteTodo = (todo: Todo) => {
		dataCollection.delete(todo.id || '').then(promiseReturn => {
			if (promiseReturn !== true) {
				console.error(promiseReturn);
				return;
			}
		});

		getTodos();
	};

	const updateTodo = (todo: Todo) => {
		dataCollection.update(todo, user?.uid || '');

		getTodos();
	};

	return {
		todos,
		addTodo,
		deleteTodo,
		updateTodo
	};
};

export default useTodos;
