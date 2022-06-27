import React from 'react';
import Spinner from '../components/base/Spinner';
import Layout from '../components/Layout';
import styles from './styles/Loading.module.css';

const Loading: React.FC = () => {
  return (
    <Layout>
      <div className={styles.spinnerContainer}>
        <Spinner />
      </div>
    </Layout>
  );
};

export default Loading;
