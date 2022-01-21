import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import ToDo from '../pages/ToDo';
import About from '../pages/About';

function App() {
	return (
		<Router>
			<Routes>
				<Route path='/sobre' element={<About />} />
				<Route path='/' element={<ToDo />} />
			</Routes>
		</Router>
	);
}

export default App;
