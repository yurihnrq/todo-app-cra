import React from 'react';
import Button from '../components/base/Button';
import { TrashIcon } from '../components/base/Icons';
import Table from '../components/base/Table';
import Layout from '../components/Layout';
import { useTodoContext } from '../context/TodoContext';
import styles from './styles/Categories.module.css';

const Categories: React.FC = () => {
  const { categories, deleteCategory } = useTodoContext();

  return (
    <Layout>
      <section>
        <Table className={styles.CategoriesTable} caption='Categorias'>
          <tbody>
            {categories.map(category =>
              category !== 'default' ? (
                <tr key={category}>
                  <td>{category}</td>
                  <td>
                    <Button
                      color='red'
                      label='Delete ToDo'
                      onClick={() => deleteCategory(category)}>
                      <TrashIcon />
                    </Button>
                  </td>
                </tr>
              ) : null
            )}
          </tbody>
        </Table>
      </section>
    </Layout>
  );
};

export default Categories;
