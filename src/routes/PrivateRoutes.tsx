import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoutes: React.FC = () => {
	const isAuth = false;
	return isAuth ? <Outlet /> : <Navigate to='/login' />;
};

export default PrivateRoutes;
