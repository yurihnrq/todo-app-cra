import React from 'react';
import Todo from '../core/Todo';
import { TrashIcon } from './Icons';
import Button from './layout/Button';
import styles from './styles/TodoRender.module.css';

interface ITodoRender {
  todos: Todo[];
  deleteTodo: (todo: Todo) => void;
  updateTodo: (todo: Todo) => void;
}

const TodoRender: React.FC<ITodoRender> = ({ todos, deleteTodo, updateTodo }) => {
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
          {renderTodos(undoneTodos)}
        </table>
      ) : null}
      {doneTodos.length > 0 ? (
        <table className={styles.Table}>
          <caption>Concluído:</caption>
          {renderTodos(doneTodos)}
        </table>
      ) : null}
    </>
  );
};

export default TodoRender;
