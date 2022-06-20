import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import Loading from '../pages/Loading';

const PrivateRoutes: React.FC = () => {
  const { user, loading } = useAuthContext();
  if (loading) return <Loading />;
  if (user) return <Outlet />;
  else return <Navigate to='/login' />;
};

export default PrivateRoutes;
