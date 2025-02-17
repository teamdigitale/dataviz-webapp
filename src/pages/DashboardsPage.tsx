import { useEffect, useState } from "react";
import { Panel, PanelGroup } from "react-resizable-panels";
import DashboardList from "../components/dashboard/DashboardList";
import Layout from "../components/layout";
import Loading from "../components/layout/Loading";
import * as auth from "../lib/auth";
import * as api from "../lib/dashaboard-api";
import useDashboardsStoreState from "../lib/dashboardListStore";

function DashboardsPage() {
  const { list, setList } = useDashboardsStoreState((state) => state);

  const [loading, setLoading] = useState(true);

  async function fetchDashboards() {
    setLoading(true);
    try {
      const data = await api.getDashboards();
      setList(data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!auth.isAuth()) {
      window.location.href = "/enter";
    }
    fetchDashboards();
  }, []);

  return (
    <Layout>
      <PanelGroup direction="horizontal" className="w-full">
        <Panel defaultSize={20} minSize={20} className="bg-base-100">
          <h1>Dashboards</h1>
          <div className="p-4">
            <div className="container">
              {loading ? (
                <Loading />
              ) : (
                <>
                  <h4 className="text-4xl font-bold">
                    {list && list.length ? "My Dashboards" : "Welcome"}
                  </h4>
                  <div>
                    <div className="flex my-5 gap-4">
                      <div
                        className="btn btn-primary"
                        onClick={() => {
                          //send
                          console.log("onAdd");
                        }}
                      >
                        + Create New dashboard
                      </div>
                    </div>
                  </div>
                  <DashboardList
                    list={list}
                    handleDeleteDashboard={() => {}}
                    handleLoadDashboard={() => {}}
                  ></DashboardList>
                </>
              )}
            </div>
          </div>
        </Panel>
      </PanelGroup>
    </Layout>
  );
}

export default DashboardsPage;
