import React from 'react';
import ReactDOM from 'react-dom/client';

import 'bootstrap-italia/dist/css/bootstrap-italia.min.css';
import 'typeface-titillium-web';
import 'typeface-roboto-mono';
import 'typeface-lora';
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
      path: '/manage-data',
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
