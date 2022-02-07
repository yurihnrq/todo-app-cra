import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import ToDo from '../pages/ToDo';
import About from '../pages/About';
import PrivateRoutes from '../routes/PrivateRoutes';
import Login from '../pages/Login';

function App() {
	return (
		<Router>
			<Routes>
				<Route path='/sobre' element={<About />} />
				<Route path='/login' element={<Login />} />
				{/* <Route path='/cadastro' element={<Signup />} /> */}
				<Route element={<PrivateRoutes />}>
					<Route path='/' element={<ToDo />} />
				</Route>
			</Routes>
		</Router>
	);
}

export default App;
