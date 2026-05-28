import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from './layout/Layout.js';
import { HomePage } from './pages/HomePage.js';
import { BooksPage } from './pages/BooksPage.js';
import { NewBookPage } from './pages/NewBookPage.js';
import { NotFoundPage } from './pages/NotFoundPage.js';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'books', element: <BooksPage /> },
      { path: 'books/new', element: <NewBookPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
