import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react'
import './App.css';

import TodoList from './pages/todolist/Todolist'
import Login from './pages/login/Login'
import UserRegister from './pages/register/UserRegister'


function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <TodoList />,
      children: []

    },
    {
      path: '/login',
      element: <Login />,
      children: []

    },
    {
      path: '/register',
      element: <UserRegister />,
      children: []

    },
  ]);
  return (
    <RouterProvider router={router} />
  )
}

export default App
