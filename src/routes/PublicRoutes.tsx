import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PublicRoutes: React.FC = () => {
	const { user } = useAuth();
	if (user === null) return <Outlet />;
	else return <Navigate to='/' />;
};

export default PublicRoutes;