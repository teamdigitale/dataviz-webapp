import ReactDOM from "react-dom/client";

import "./style/index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AboutPage from "./pages/About";
import AuthPage from "./pages/AuthPage";
import DashboardCreatePage from "./pages/DashboardCreatePage";
import DashboardEditPage from "./pages/DashboardEditPage";
import DashboardsPage from "./pages/DashboardsPage";
import DashboardViewPage from "./pages/DashboardViewPage";
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
    {
      path: "/dashboards/create",
      element: <DashboardCreatePage />,
    },
    {
      path: "/dashboards/:id/edit",
      element: <DashboardEditPage />,
    },
    {
      path: "/dashboards/:id/view",
      element: <DashboardViewPage />,
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
