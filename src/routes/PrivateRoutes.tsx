import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

const PrivateRoutes: React.FC = () => {
  const { user } = useAuthContext();
  if (user) return <Outlet />;
  else return <Navigate to='/login' />;
};

export default PrivateRoutes;
