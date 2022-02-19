import React from 'react';
import Footer from './layout/Footer';
import Header from './layout/Header';
import styles from './styles/Layout.module.css';
import { useAuth } from '../context/AuthContext';
import Spinner from './layout/Spinner';

const Layout: React.FC = ({ children }) => {
  const { loading } = useAuth();

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
