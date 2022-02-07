import React from 'react';
import ToDo from '../core/ToDo';
import { TrashIcon } from './Icons';
import Button from './layout/Button';
import styles from './styles/Table.module.css';

interface ITable {
	todos: ToDo[],
	deleteAction: (todo: ToDo) => boolean
	checkAction: (todo: ToDo) => void
}

const Table: React.FC<ITable> = ({ todos, deleteAction, checkAction }) => {

	const renderTodos = () => {

		return todos?.map((todo: ToDo, i: number): React.ReactNode => {
			return (
				<tr className={`${styles.row} ${i%2 !== 0 ? 'bg-slate-300 dark:bg-slate-700' : ''}`} key={todo.id}>
					<td>
						<input type='checkbox' id={i.toString()} checked={todo.done} onChange={() => checkAction(todo)} />
					</td>
					<td>
						<label htmlFor={i.toString()}>
							{todo.description}
						</label>
					</td>
					<td className={styles.date}>
						{todo.createdAt.toLocaleDateString('pt-BR')}
					</td>
					<td>
						<Button onClick={() => deleteAction(todo)} color='red' label='Delete ToDo'>
							{TrashIcon}
						</Button>
					</td>
				</tr>
			);
		});
	};

	return (
		<table className={styles.Table}>
			<tbody>
				{renderTodos()}
			</tbody>
		</table>
	);
};

export default Table;
