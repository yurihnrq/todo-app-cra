import React from 'react';
import Button from '../components/base/Button';
import { TrashIcon } from '../components/base/Icons';
import Layout from '../components/Layout';
import { useTodoContext } from '../context/TodoContext';

const Categories: React.FC = () => {
  const { categories, deleteCategory } = useTodoContext();

  return (
    <Layout>
      <section>
        <h1>Categorias</h1>
        <table>
          <tbody>
            {categories.map(category =>
              category !== 'default' ? (
                <tr key={category}>
                  <td>{category}</td>
                  <td>
                    <Button
                      color='red'
                      label='Delete ToDo'
                      className='m-1'
                      onClick={() => deleteCategory(category)}>
                      {TrashIcon}
                    </Button>
                  </td>
                </tr>
              ) : null
            )}
          </tbody>
        </table>
      </section>
    </Layout>
  );
};

export default Categories;
