import React from 'react';
import ReactDOM from 'react-dom/client';

import './style/index.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/Home';
import AboutPage from './pages/About';
import DataPage from './pages/GenerateDataPage';
import LoadDataPage from './pages/LoadDataPage';
import GenerateDataPage from './pages/GenerateDataPage';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <HomePage />,
    },
    {
      path: '/load-data',
      element: <LoadDataPage />,
    },
    {
      path: '/generate-data',
      element: <GenerateDataPage />,
    },
    {
      path: '/about',
      element: <AboutPage />,
    },
  ]);

  return (
    <Layout>
      <RouterProvider router={router} />
    </Layout>
  );
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <App />
);
