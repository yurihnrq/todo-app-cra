import React from 'react';
import Todo from '../core/Todo';
import { TrashIcon } from './Icons';
import Button from './layout/Button';
import styles from './styles/TodoTable.module.css';

interface ITodoTable {
  todos: Todo[];
  deleteAction: (todo: Todo) => void;
  updateAction: (todo: Todo) => void;
}

const TodoTable: React.FC<ITodoTable> = ({ todos, deleteAction, updateAction }) => {
  const renderTodos = () => {
    return todos
      ?.sort((a, b) => (a.done >= b.done ? 1 : -1))
      .map((todo: Todo, i: number) => (
        <tr className={styles.row} key={todo.id}>
          <td>
            <input
              type='checkbox'
              id={i.toString()}
              checked={todo.done}
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
          <td className={styles.date}>{todo.createdAt.toLocaleDateString('pt-BR')}</td>
          <td>
            <Button
              color='red'
              label='Delete ToDo'
              className='m-1'
              onClick={() => deleteAction(todo)}>
              {TrashIcon}
            </Button>
          </td>
        </tr>
      ));
  };

  return (
    <table className={styles.Table}>
      <tbody>{renderTodos()}</tbody>
    </table>
  );
};

export default TodoTable;
