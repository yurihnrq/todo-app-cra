
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
			if (error !== null ) setError(null);
		} catch (error) {
			setError('Erro: ' + error);
		}
	};

	const addTodo = (todo: string) => {
		try {
			const todoObj = new Todo(todo, false, new Date());
			dataCollection.save(todoObj, user).then(todo => {
				// Aqui eu mudo o estado diretamente ao invés de chamar o método
				// getTodos, pois assim o delay entre a ação e o retorno visual é menor.

				// Como estamos em um bloco try catch, entrar neste then() significa
				// que todo o provesso de adicionar o documento no Firestore ocorreu com sucesso.
				setTodos(prevState => [todo, ...prevState]);
			});
			if (error !== null ) setError(null);
		} catch (error) {
			setError('Erro: ' + error);
		}
	};

	const deleteTodo = (todo: Todo) => {
		try {
			dataCollection.delete(todo, user).then(() => {
				const todosHandler = [...todos];
				const index = todosHandler.findIndex(elem => elem.id == todo.id);
				todosHandler.splice(index , 1);
				// setTodos aqui pelo menos motivo explicado em addTodo();
				setTodos([...todosHandler]);
			});
			if (error !== null ) setError(null);
		} catch (error) {
			setError('Erro: ' + error);
		}
	};

	const updateTodo = (todo: Todo) => {
		try {
			dataCollection.update(todo, user).then(() => {
				const todosHandler = [...todos];
				const index = todosHandler.findIndex(elem => elem.id == todo.id);
				// update() recebe o objeto Todo atualizado. Desse modo,
				// devemos apenas substitui-lo no index correto.
				todosHandler[index] = todo;
				// setTodos aqui pelo menos motivo explicado em addTodo();
				setTodos([...todosHandler]);
			});
			if (error !== null ) setError(null);
		} catch (error) {
			setError('Erro: ' + error);
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
