import ReactDOM from "react-dom/client";

import "./style/index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AboutPage from "./pages/About";
import AuthPage from "./pages/AuthPage";
import DashboardsPage from "./pages/DashboardsPage";
import EmbedChartPage from "./pages/EmbedChartPage";
import GenerateDataPage from "./pages/GenerateDataPage";
import GeoMapUtilsPage from "./pages/GeoMapUtilsPage";
import HomePage from "./pages/Home";
import LoadDataPage from "./pages/LoadDataPage";
import ShowChartPage from "./pages/ShowChartPage";
import TestGridPage from "./pages/TestGridPage";

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
    //load data page
    {
      path: "/load-data",
      element: <LoadDataPage />,
    },
    //generate data page
    {
      path: "/generate-data",
      element: <GenerateDataPage />,
    },
    //show chart page
    {
      path: "/chart/:id",
      element: <ShowChartPage />,
    },
    //embed chart page
    {
      path: "/embed/:id",
      element: <EmbedChartPage />,
    },
    //create dashboard page
    {
      path: "/grid",
      element: <TestGridPage />,
    },
    //list dashboard page
    {
      path: "/dashboards",
      element: <DashboardsPage />,
    },
    //create dashboard page
    {
      path: "/geo",
      element: <GeoMapUtilsPage />,
    },
  ]);

  return <RouterProvider router={router} />;
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <App />
);
