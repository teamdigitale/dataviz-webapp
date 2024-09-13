import React from "react";
import ReactDOM from "react-dom/client";

import "./style/index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/Home";
import AboutPage from "./pages/About";
import LoadDataPage from "./pages/LoadDataPage";
import GenerateDataPage from "./pages/GenerateDataPage";
import ShowChartPage from "./pages/ShowChartPage";
import AuthPage from "./pages/AuthPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AboutPage />,
    },
    {
      path: "/home",
      element: <HomePage />,
    },
    {
      path: "/enter",
      element: <AuthPage />,
    },
    {
      path: "/load-data",
      element: <LoadDataPage />,
    },
    {
      path: "/generate-data",
      element: <GenerateDataPage />,
    },

    {
      path: "/chart/:id",
      element: <ShowChartPage />,
    },
  ]);

  return (
    <Layout>
      <RouterProvider router={router} />
    </Layout>
  );
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <App />
);
