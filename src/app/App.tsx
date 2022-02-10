import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Todo from '../pages/Todo';
import About from '../pages/About';
import PrivateRoutes from '../routes/PrivateRoutes';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import AuthProvider from '../context/AuthContext';
import PublicRoutes from '../routes/PublicRoutes';

function App() {
	return (
		<Router>
			<AuthProvider>
				<Routes>
					<Route path='/sobre' element={<About />} />
					<Route element={<PublicRoutes />}>
						<Route path='/login' element={<Login />} />
						<Route path='/cadastro' element={<Signup />} />
					</Route>
					<Route element={<PrivateRoutes />}>
						<Route path='/' element={<Todo />} />
					</Route>
				</Routes>
			</AuthProvider>
		</Router>
	);
}

export default App;
