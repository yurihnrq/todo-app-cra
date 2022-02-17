import React from 'react';
import Footer from './Footer';
import Header from './Header';
import styles from './styles/Layout.module.css';
import { useAuth } from '../../context/AuthContext';
import Spinner from './Spinner';

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
