import React from 'react';
import Spinner from '../components/base/Spinner';
import Layout from '../components/Layout';

const Loading: React.FC = () => {
  return (
    <Layout>
      <Spinner />
    </Layout>
  );
};

export default Loading;
