import React from 'react';
import ReactDOM from 'react-dom/client';

import './style/index.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/Home';
import AboutPage from './pages/About';
import DataPage from './pages/DataPage';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <HomePage />,
    },
    {
      path: '/data',
      element: <DataPage />,
    },
    {
      path: '/about',
      element: <AboutPage />,
    },
  ]);

  return (
    <>
      <Layout>
        <RouterProvider router={router} />
      </Layout>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <App />
);
