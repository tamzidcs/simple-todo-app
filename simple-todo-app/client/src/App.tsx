import './App.scss';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import React from 'react';
import { TodoList } from './components/TodoList/TodoList';
import Landing from './components/Landing/Landing';
import { Signup } from './components/Signup/Signup';
import { Login } from './components/Login/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<Landing />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/toDoList" element={<TodoList />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
