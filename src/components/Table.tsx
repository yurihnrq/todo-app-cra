import React from "react";
import ToDo from "../core/ToDo";
import { TrashIcon } from "./Icons";

import styles from "./Table.module.css";

interface ITable {
	todos: ToDo[]
}

const Table: React.FC<ITable> = ({ todos }) => {

	const handleCheckbox = (todoID: string | null): void => {
		return console.log(todoID);
	};

	const renderTodos = () => {
		return todos?.map((todo: ToDo): React.ReactNode => {
			return (
				<tr key={todo.id}>
					<td>
						<input type="checkbox" checked={todo.done} onChange={() => handleCheckbox(todo.id)} />
					</td>
					<td>
						{todo.description}
					</td>
					<td>
						{todo.createdAt.getTime()}
					</td>
					<td>
						<button className={styles.removeButton}>
							{TrashIcon}
						</button>
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
