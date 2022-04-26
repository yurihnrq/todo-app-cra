import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Todo from '../pages/Todo';
import About from '../pages/About';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Recovery from '../pages/Recovery/Recovery';
import ResetPassword from '../pages/Recovery/ResetPassword';
import AuthProvider from '../context/AuthContext';
import PublicRoutes from '../routes/PublicRoutes';
import PrivateRoutes from '../routes/PrivateRoutes';
import TodoContext from '../context/TodoContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <TodoContext.Provider>
          <Routes>
            <Route path='/sobre' element={<About />} />
            <Route path='/recuperacao' element={<Recovery />} />
            <Route path='/recuperacao/reset' element={<ResetPassword />} />
            <Route element={<PublicRoutes />}>
              <Route path='/login' element={<Login />} />
              <Route path='/cadastro' element={<Signup />} />
            </Route>
            <Route element={<PrivateRoutes />}>
              <Route path='/' element={<Todo />} />
            </Route>
          </Routes>
        </TodoContext.Provider>
      </AuthProvider>
    </Router>
  );
}

export default App;
