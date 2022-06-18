import React from 'react';
import { useTodoContext } from '../context/TodoContext';
import styles from './styles/CategoryTabs.module.css';

const CategoryTabs: React.FC = () => {
  const { categories, selectCategory, selectedCategory } = useTodoContext();

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
            {category}
          </li>
        ))}
        <li
          className={`
              ${selectedCategory === 'teste' ? styles.activeTab : ''}
              ${styles.tabItem}
            `}
          onClick={() => selectCategory('teste')}
          key={'teste'}>
          {'teste'}
        </li>
      </ul>
      <button>+</button>
    </div>
  );
};

export default CategoryTabs;
