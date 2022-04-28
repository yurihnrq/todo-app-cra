import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

const PublicRoutes: React.FC = () => {
  const { user } = useAuthContext();
  if (user === null) return <Outlet />;
  else return <Navigate to='/' />;
};

export default PublicRoutes;
