import React from 'react';
import Layout from '../components/Layout';
import TodoRender from '../components/TodoRender';
import TodoForm from '../components/TodoForm';
import styles from './styles/Todo.module.css';
import { useAuthContext } from '../context/AuthContext';
import { useTodoContext } from '../context/TodoContext';

const Home: React.FC = () => {
  const { user } = useAuthContext();
  if (user) {
    const { todos } = useTodoContext();
    return (
      <Layout>
        <section className={styles.Todo}>
          <h2 className='dark:text-slate-200'>
            Olá {user?.email?.slice(0, user?.email?.indexOf('@'))}
          </h2>
          {todos.length > 0 ? (
            <TodoRender />
          ) : (
            <h3 className='mt-5'>Insira uma tarefa no campo acima. ⬆️📝</h3>
          )}
          <TodoForm />
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
