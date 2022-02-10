import React from 'react';
import Layout from '../components/layout/Layout';
import Table from '../components/Table';
import Form from '../components/TodoForm';
import styles from './styles/ToDo.module.css';
import { useAuth } from '../context/AuthContext';
import useTodos from '../hooks/useTodos';

const Home: React.FC = () => {
	const { user } = useAuth();
	const { todos, addTodo, deleteTodo, updateTodo } = useTodos(user);

	return (
		<Layout>
			<section className={styles.ToDo}>
				<h2 className='dark:text-slate-200'>Olá {user?.email}</h2>
				<Form addAction={addTodo} />
				<Table deleteAction={deleteTodo} updateAction={updateTodo} todos={todos} />
			</section>
		</Layout>
	);
};

export default Home;
