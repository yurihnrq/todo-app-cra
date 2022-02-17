import React from 'react';
import Layout from '../components/layout/Layout';
import TodoRender from '../components/TodoRender';
import TodoForm from '../components/TodoForm';
import styles from './styles/Todo.module.css';
import { useAuth } from '../context/AuthContext';
import useTodos from '../hooks/useTodos';

const Home: React.FC = () => {
  const { user } = useAuth();
  if (user) {
    const { todos, updateTodo, deleteTodo, addTodo } = useTodos(user);

    return (
      <Layout>
        <section className={styles.Todo}>
          <h2 className='dark:text-slate-200'>
            Olá {user?.email?.slice(0, user?.email?.indexOf('@'))}
          </h2>
          <TodoForm addTodo={addTodo} />
          {todos.length > 0 ? (
            <TodoRender todos={todos} deleteTodo={deleteTodo} updateTodo={updateTodo} />
          ) : (
            <h3>Insira uma tarefa no campo acima. ⬆️📝</h3>
          )}
        </section>
      </Layout>
    );
  } else {
    return (
      <Layout>
        <section className={styles.Todo}>
          <h2 className='dark:text-slate-200'>
            Você não possui permissão para acessar essa página.
          </h2>
        </section>
      </Layout>
    );
  }
};

export default Home;
