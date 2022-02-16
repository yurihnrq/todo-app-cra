import React from 'react';
import Footer from './Footer';
import Header from './Header';
import styles from './styles/Layout.module.css';
import { useAuth } from '../../context/AuthContext';
import { CSSTransition } from 'react-transition-group';

const Layout: React.FC = ({ children }) => {
  const { loading } = useAuth();

  return (
    <div className={styles.Layout}>
      <Header />
      <CSSTransition in={loading} timeout={150} unmountOnExit>
        <div className={styles.loading}>
          <div className={styles.spinner} />
        </div>
      </CSSTransition>
      <CSSTransition
        in={!loading}
        timeout={150}
        unmountOnExit
        classNames={{
          enter: styles.contentEnter,
          enterActive: styles.contentEnterActive,
          exit: styles.contentExit,
          exitActive: styles.contentExitActive,
        }}
      >
        <main className={styles.content}>{children}</main>
      </CSSTransition>
      <Footer />
    </div>
  );
};

export default Layout;
