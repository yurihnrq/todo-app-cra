import React from 'react';
import Footer from './base/Footer';
import Header from './base/Header';
import styles from './styles/Layout.module.css';
import { useAuthContext } from '../context/AuthContext';
import Spinner from './base/Spinner';

const Layout: React.FC = ({ children }) => {
  const { loading } = useAuthContext();

  return (
    <div className={styles.Layout}>
      <Header />
      <main className={styles.content}>
        {loading ? (
          <div className={styles.spinnerContainer}>
            <Spinner />
          </div>
        ) : (
          children
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
