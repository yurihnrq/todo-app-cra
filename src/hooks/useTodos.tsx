
import { useEffect, useState } from 'react';
import TodoCollection from '../backend/database/TodoCollection';
import Todo from '../core/Todo';
import { User } from 'firebase/auth';

interface useTodosReturnTypes {
	todos: Todo[];
	error: string | null,
	addTodo: (todo: string) => void;
	deleteTodo: (todo: Todo) => void;
	updateTodo: (todo: Todo) => void;
}

const useTodos = (user: User | null): useTodosReturnTypes => {
	const dataCollection = new TodoCollection();
	const [todos, setTodos] = useState<Todo[]>([]);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		getTodos();
		return () => {
			setTodos([]);
		};
	}, []);

	const getTodos = () => {
		try {
			dataCollection.getAll(user).then(todos => {
				setTodos(todos);
			});
			if (error !== null) setError(null);
		} catch (err) {
			setError('Erro: ' + err);
			console.error(error);
		}
	};

	const addTodo = (todo: string) => {
		try {
			const todoObj = new Todo(todo, false, new Date());
			dataCollection.save(todoObj, user);
			getTodos();
			if (error !== null) setError(null);
		} catch (err) {
			setError('Erro: ' + err);
			console.error(error);
		}
	};

	const deleteTodo = (todo: Todo) => {
		try {
			dataCollection.delete(todo, user);
			getTodos();
			if (error !== null) setError(null);
		} catch (err) {
			setError('Erro: ' + err);
			console.error(error);
		}
	};

	const updateTodo = (todo: Todo) => {
		try {
			dataCollection.update(todo, user);
			getTodos();
			if (error !== null) setError(null);
		} catch (err) {
			setError('Erro: ' + err);
			console.error(error);
		}
	};

	return {
		todos,
		error,
		addTodo,
		deleteTodo,
		updateTodo
	};
};

export default useTodos;
