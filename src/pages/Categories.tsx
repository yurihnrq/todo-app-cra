import React, { useState } from 'react';
import Button from '../components/base/Button';
import { TrashIcon } from '../components/base/Icons';
import Modal from '../components/base/Modal';
import Table from '../components/base/Table';
import Layout from '../components/Layout';
import { useTodoContext } from '../context/TodoContext';
import styles from './styles/Categories.module.css';

const Categories: React.FC = () => {
  const { categories, deleteCategory } = useTodoContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null);

  return (
    <Layout>
      <section>
        <Table className={styles.categoriesTable} caption='Categorias'>
          <tbody>
            {categories.map(category =>
              category !== 'default' ? (
                <tr key={category}>
                  <td>{category}</td>
                  <td>
                    <Button
                      color='red'
                      label='Delete ToDo'
                      onClick={() => {
                        setCategoryToDelete(category);
                        setIsModalOpen(true);
                      }}>
                      <TrashIcon />
                    </Button>
                  </td>
                </tr>
              ) : null
            )}
          </tbody>
        </Table>
      </section>
      {isModalOpen ? (
        <Modal title='Exclusão' onClose={() => setIsModalOpen(false)}>
          <p>
            Tem certeza que deseja excluir <strong>{categoryToDelete}</strong>?
          </p>
          <div className={styles.buttonContainer}>
            <Button
              color='red'
              label='Excluir categoria'
              onClick={() => {
                if (categoryToDelete) {
                  deleteCategory(categoryToDelete);
                  setCategoryToDelete(null);
                }
                setIsModalOpen(false);
              }}>
              Excluir
            </Button>
            <Button color='blue' label='Cancelar exclusão' onClick={() => setIsModalOpen(false)}>
              Cancelar
            </Button>
          </div>
        </Modal>
      ) : null}
    </Layout>
  );
};

export default Categories;
