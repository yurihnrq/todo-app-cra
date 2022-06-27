import React from 'react';
import { useTodoContext } from '../context/TodoContext';
import Todo from '../core/Todo';
import { TrashIcon } from './base/Icons';
import Button from './base/Button';
import styles from './styles/TodoRender.module.css';
import Table from './base/Table';

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
          <Button color='red' label='Delete ToDo' onClick={() => deleteTodo(todo)}>
            <TrashIcon />
          </Button>
        </td>
      </tr>
    ));
  };

  return (
    <>
      {undoneTodos.length > 0 ? (
        <Table caption='A fazer:' className={styles.TodosTable}>
          <tbody>{renderTodos(undoneTodos)}</tbody>
        </Table>
      ) : null}
      {doneTodos.length > 0 ? (
        <Table caption='Concluído:' className={styles.TodosTable}>
          <tbody>{renderTodos(doneTodos)}</tbody>
        </Table>
      ) : null}
    </>
  );
};

export default TodoRender;
