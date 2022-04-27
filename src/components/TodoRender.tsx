import React from 'react';
import { useTodoContext } from '../context/TodoContext';
import Todo from '../core/Todo';
import { TrashIcon } from './base/Icons';
import Button from './base/Button';
import styles from './styles/TodoRender.module.css';

const TodoRender: React.FC = () => {
  const { todos, updateTodo, deleteTodo } = useTodoContext();
  const doneTodos = todos.filter(todo => todo.done);
  const undoneTodos = todos.filter(todo => !todo.done);

  const renderTodos = (todoArray: Todo[]): JSX.Element[] => {
    return todoArray.map(todo => (
      <tr className={styles.row} key={todo.id}>
        <td>
          <input
            type='checkbox'
            id={todo.id?.toString()}
            checked={todo.done}
            onChange={() => {
              todo.done = !todo.done;
              updateTodo(todo);
            }}
          />
        </td>
        <td>
          <label htmlFor={todo.id?.toString()} className={`${todo.done ? styles.done : ''}`}>
            {todo.description}
          </label>
        </td>
        <td className={styles.date}>{todo.createdAt.toLocaleDateString('pt-BR')}</td>
        <td>
          <Button color='red' label='Delete ToDo' className='m-1' onClick={() => deleteTodo(todo)}>
            {TrashIcon}
          </Button>
        </td>
      </tr>
    ));
  };

  return (
    <>
      {undoneTodos.length > 0 ? (
        <table className={styles.Table}>
          <caption>A fazer:</caption>
          <tbody>{renderTodos(undoneTodos)}</tbody>
        </table>
      ) : null}
      {doneTodos.length > 0 ? (
        <table className={styles.Table}>
          <caption>Concluído:</caption>
          <tbody>{renderTodos(doneTodos)}</tbody>
        </table>
      ) : null}
    </>
  );
};

export default TodoRender;
