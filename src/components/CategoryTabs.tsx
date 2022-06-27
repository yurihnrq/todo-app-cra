import React, { useState } from 'react';
import { useTodoContext } from '../context/TodoContext';
import Button from './base/Button';
import Form from './base/Form';
import { PlusIcon } from './base/Icons';
import Input from './base/Input';
import Modal from './base/Modal';
import styles from './styles/CategoryTabs.module.css';

const CategoryTabs: React.FC = () => {
  const { categories, selectCategory, selectedCategory, addCategory } = useTodoContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [category, setCategory] = useState('');

  return (
    <div className={styles.CategoryTabs}>
      <ul className={styles.tabList}>
        {categories.map(category => (
          <li
            className={`
              ${selectedCategory === category ? styles.activeTab : ''}
              ${styles.tabItem}
            `}
            onClick={() => selectCategory(category)}
            key={category}>
            {category === 'default' ? 'Minhas tarefas' : category}
          </li>
        ))}
      </ul>
      <button className={styles.button} onClick={() => setIsModalOpen(true)}>
        <PlusIcon />
      </button>
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)} title='Insira uma categoria'>
          <Form onSubmit={e => e.preventDefault()}>
            <Input
              type='text'
              value={category}
              onChange={({ target }) => setCategory(target.value)}
            />
            <Button
              className={styles.modalButton}
              color='blue'
              label='dale'
              onClick={() => {
                addCategory(category);
                setIsModalOpen(false);
              }}>
              Adicionar
            </Button>
          </Form>
        </Modal>
      )}
    </div>
  );
};

export default CategoryTabs;
