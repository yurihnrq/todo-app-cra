import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import Table from '../components/Table';
import Form from '../components/Form';

import styles from './ToDo.module.css';
import ToDo from '../core/ToDo';

const Home: React.FC = () => {

	const [todos, setTodos] = useState<ToDo[]>([]);
	// Just for initial implementation.
	// This counter is used do generate ids for the todos in the list.
	const [count, setCount] = useState<number>(0);

	// Increment the counter when the todo list is updated.
	useEffect(() => {
		setCount(count + 1);
	}, [todos]);

	const addTodo = (todo: string): void => {
		const newTodo = new ToDo(todo, false, new Date(), count.toString());
		setTodos(todos => [...todos, newTodo]);
	};

	const deleteToDo = ({ id }: ToDo): boolean => {
		const todoHandler = [...todos];
		const index = todoHandler.findIndex(todo => todo.id === id);

		if (index < 0)
			return false;

		todoHandler.splice(index, 1);
		setTodos([...todoHandler]);
		return true;
	};

	const checkTodo = ({ id }: ToDo): void => {
		const todoHandler = [...todos];
		const index = todoHandler.findIndex(todo => todo.id === id);

		if (index >= 0) todoHandler[index].done = !todoHandler[index].done;

		setTodos([...todoHandler]);
	};

	return (
		<Layout>
			<section className={styles.ToDo}>
				<h2>ToDos</h2>
				<Form action={addTodo} />
				<Table deleteAction={deleteToDo} checkAction={checkTodo} todos={todos} />
			</section>
		</Layout>
	);
};

export default Home;
