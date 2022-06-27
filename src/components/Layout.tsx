import React from 'react';
import Header from './base/Header';
import styles from './styles/Layout.module.css';

const Layout: React.FC = ({ children }) => {

  return (
    <div className={styles.Layout}>
      <Header />
      <main className={styles.content}>{children}</main>
    </div>
  );
};

export default Layout;
