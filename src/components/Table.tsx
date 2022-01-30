import React from 'react';
import ToDo from '../core/ToDo';
import { TrashIcon } from './Icons';
import Button from './Button';

import styles from './Table.module.css';

interface ITable {
	todos: ToDo[]
}

const Table: React.FC<ITable> = ({ todos }) => {

	const handleCheckbox = (todoID: string | null): void => {
		return console.log(todoID);
	};

	const renderTodos = () => {
		return todos?.map((todo: ToDo, i: number): React.ReactNode => {
			return (
				<tr key={todo.id}>
					<td>
						<input type='checkbox' id={i.toString()} checked={todo.done} onChange={() => handleCheckbox(todo.id)} />
					</td>
					<td>
						<label htmlFor={i.toString()}>
							{todo.description}
						</label>
					</td>
					<td>
						{todo.createdAt.getTime()}
					</td>
					<td>
						<Button color='red' label='Delete ToDo'>
							{TrashIcon}
						</Button>
					</td>
				</tr>
			);
		});
	};

	return (
		<table className={styles.Table}>
			<thead>
				<tr>
					<th colSpan={4}>ToDos</th>
				</tr>
			</thead>
			<tbody>
				{renderTodos()}
			</tbody>
		</table>
	);
};

export default Table;
