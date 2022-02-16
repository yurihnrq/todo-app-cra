import React from 'react';
import Todo from '../core/Todo';
import { TrashIcon } from './Icons';
import Button from './layout/Button';
import styles from './styles/Table.module.css';

interface ITable {
	todos: Todo[],
	deleteAction: (todo: Todo) => void
	updateAction: (todo: Todo) => void
}

const Table: React.FC<ITable> = ({ todos, deleteAction, updateAction }) => {

  const renderTodos = () => {
    return (todos?.sort((a, b) => a.done >= b.done ? 1 : -1).map((todo: Todo, i: number) => (
      <tr
        className={`${styles.row} ${i % 2 !== 0 ? 'bg-slate-300 dark:bg-slate-700' : ''}`}
        key={todo.id}
      >
        <td>
          <input
            type='checkbox' id={i.toString()} checked={todo.done}
            onChange={() => {
              todo.done = !todo.done;
              updateAction(todo);
            }}
          />
        </td>
        <td>
          <label htmlFor={i.toString()} className={`${todo.done ? styles.done : ''}`}>
            {todo.description}
          </label>
        </td>
        <td className={styles.date}>
          {todo.createdAt.toLocaleDateString('pt-BR')}
        </td>
        <td>
          <Button
            color='red' label='Delete ToDo'
            className='m-1'
            onClick={() => deleteAction(todo)}
          >
            {TrashIcon}
          </Button>
        </td>
      </tr>
    )));
  };

  return (
    <table className={styles.Table}>
      <tbody>
        {
          todos.length > 0 ?
            renderTodos() :
            <h3>Cadastre uma tarefa no campo acima. ⬆️</h3>
        }
      </tbody>
    </table>
  );
};

export default Table;
