import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { useTodoContext } from '../context/TodoContext';
import Loading from '../pages/Loading';

const PrivateRoutes: React.FC = () => {
  const { user, loading: userLoading } = useAuthContext();
  const { loading: todosLoading } = useTodoContext();
  if (userLoading || todosLoading) return <Loading />;
  if (user) return <Outlet />;
  else return <Navigate to='/login' />;
};

export default PrivateRoutes;
