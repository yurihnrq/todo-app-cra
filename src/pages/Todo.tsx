import React from 'react';
import Layout from '../components/Layout';
import TodoForm from '../components/TodoForm';
import styles from './styles/Todo.module.css';
import { useAuthContext } from '../context/AuthContext';
import { useTodoContext } from '../context/TodoContext';
import CategoryTabs from '../components/CategoryTabs';
import TodoRender from '../components/TodoRender';

const Home: React.FC = () => {
  const { user } = useAuthContext();
  if (user) {
    const { todos } = useTodoContext();
    return (
      <Layout>
        <section className={styles.Todo}>
          <h2 className='dark:text-slate-200'>
            Olá {user.email?.slice(0, user?.email?.indexOf('@'))}
          </h2>
          <div className={styles.todoContainer}>
            <TodoForm />
            <section className={styles.renderSection}>
              <CategoryTabs />
              {todos.length > 0 ? <TodoRender /> : null}
            </section>
          </div>
        </section>
      </Layout>
    );
  }

  return null;
};

export default Home;
