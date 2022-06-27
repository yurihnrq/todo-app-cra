import React from 'react';
import styles from './styles/Table.module.css';

interface ITable {
  className?: string;
  caption?: string;
}

const Table: React.FC<ITable> = ({ children, caption, className = '' }) => {
  return (
    <table className={`${styles.Table} ${className}`}>
      {caption ? <caption>{caption}</caption> : null}
      {children}
    </table>
  );
};

export default Table;
