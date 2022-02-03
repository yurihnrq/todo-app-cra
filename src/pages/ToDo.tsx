import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import Table from '../components/Table';
import Form from '../components/Form';

import styles from './ToDo.module.css';
import ToDo from '../core/ToDo';

const Home: React.FC = () => {
	const [todos, setTodos] = useState<Array<ToDo>>(new Array<ToDo>());
	// Apenas para implementação inicial.
	// Este contador é utilizado para gerar IDs para os items da lista.
	const [counter, setCounter] = useState<number>(0);

	useEffect(() => {
		// Quando geramos uma string a partir do array de objetos do tipo ToDo, temos o seguinte resultado:
		// ["{}", "{}", "{}", ...]
		// Cada objeto se torna uma string e o mesmo vale para objetos dentro do objeto, quero dizer:
		// - Um objeto dentro do array se torna um json, onde cada par atributo/valor vira uma string.
		// - No objeto do tipo ToDo temos um atributo que é um objeto do tipo Date, ele sofre o mesmo efeito.
		// Devido a isso, ao obter o array do localStorage, e converte-lo com JSON.parse(), temos um array de strings (os objetos).
		// Feito isso, percorremos este array de string, e utilizamos a função fromJSON() que implementei.
		// Esta função retorna um objeto do tipo ToDo baseado na string recebida.
		const stringifiedArray: string[] = JSON.parse(localStorage.getItem('todos') || '[]');
		stringifiedArray.forEach(todo => {
			setTodos(todos => [...todos, ToDo.fromJSON(todo)]);
		});

		// Obtenho o contador armazenado no localStorage.
		const counter: number = JSON.parse(localStorage.getItem('counter') || '0');
		setCounter(counter);
	}, []);

	useEffect(() => {
		// Sempre que o array de ToDos é atualizado, devemos atualizar localStorage com o novo conteúdo.
		// JSON.stringify() ira serializar o array de todos e ira notar que cada objeto do array tem uma funçao toJSON().
		// Desse modo, JSON.stringify() irá utilizar a função toJSON() implementada para serializar cada objeto do array.
		localStorage.setItem('todos', JSON.stringify(todos));
		// Se em algum momento não houver todos no array, podemos zerar o contador com segurança.
		// Com segurança quer dizer que não corremos risco de zerá-lo e causar conflito de ids.
		if (todos.length == 0)
			setCounter(0);
	}, [todos]);

	useEffect(() => {
		// Atualiza o contador no localStorade sempre que ele muda.
		localStorage.setItem('counter', JSON.stringify(counter));
	}, [counter]);

	const addTodo = (todo: string): void => {
		const newTodo = new ToDo(todo, false, new Date(), counter.toString());
		setTodos(todos => [...todos, newTodo]);
		setCounter(counter + 1);
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
				<h2 className='dark:text-slate-200'>ToDos</h2>
				<Form action={addTodo} />
				<Table deleteAction={deleteToDo} checkAction={checkTodo} todos={todos} />
			</section>
		</Layout>
	);
};

export default Home;
