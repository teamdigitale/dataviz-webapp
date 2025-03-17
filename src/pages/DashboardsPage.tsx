import { useEffect, useState } from "react";
import { Panel, PanelGroup } from "react-resizable-panels";
import { useNavigate } from "react-router-dom";
import DashboardList from "../components/dashboard/DashboardList";
import Layout from "../components/layout";
import ConfirmDialog from "../components/layout/ConfirmDialog";
import GenericDialog from "../components/layout/GenericDialog";
import Loading from "../components/layout/Loading";
import * as auth from "../lib/auth";
import * as api from "../lib/dashaboard-api";
import useDashboardsStoreState from "../lib/dashboardListStore";
import { FieldDataType } from "../sharedTypes";

function DashboardsPage() {
  const { list, setList } = useDashboardsStoreState((state) => state);

  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<FieldDataType>();

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

  const navigate = useNavigate();

  function createClickHandler() {
    setShowCreateModal(true);
    //navigate(`/dashboards/create`);
  }

  function editClickHandler(id: string) {
    if (!id) {
      throw new Error();
    }
    navigate(`/dashboards/${id}/edit`);
  }

  function viewClickHandler(id: string) {
    if (!id) {
      throw new Error();
    }
    navigate(`/dashboards/${id}/view`);
  }

  function deleteClickHandler(id: string) {
    const item = list.find((l) => l.id === id);
    if (item) {
      setSelectedItem(item);
      setShowDeleteModal(true);
    }
  }

  async function dialogConfirmModalHandler() {
    if (!selectedItem) {
      return;
    }

    const { id } = selectedItem;

    if (id) {
      try {
        const data = await api.deleteDashaboard(id);
        if (data) {
          fetchDashboards();
        }
      } catch (error) {
        console.log(error);
      }
    }
    closeDeleteModal();
  }
  function dialogCancelModalHandler() {
    closeDeleteModal();
  }

  function closeDeleteModal() {
    setShowDeleteModal(false);
    setSelectedItem(undefined);
  }

  function createModalConfirmHandler() {
    closeCreateModal();
  }

  function createModalCancelHandler() {
    closeCreateModal();
  }

  function closeCreateModal() {
    setShowCreateModal(false);
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
        <Panel defaultSize={30} minSize={20} className="bg-base-100">
          <div className="p-4">
            <div>
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
                        onClick={createClickHandler}
                      >
                        + Create New dashboard
                      </div>
                    </div>
                  </div>
                  <DashboardList
                    list={list}
                    handleDeleteDashboard={deleteClickHandler}
                    handleEditDashboard={(item) => {
                      editClickHandler(item.id ?? "");
                    }}
                    handleViewDashboard={viewClickHandler}
                  ></DashboardList>
                </>
              )}
            </div>
            {showCreateModal && (
              <GenericDialog
                toggle={showCreateModal}
                title="Aggiungi Dashboard"
                confirmCb={() => {
                  createModalConfirmHandler();
                }}
                cancelCb={() => {
                  createModalCancelHandler;
                }}
              >
                <h1>Hola</h1>
              </GenericDialog>
            )}
            {showDeleteModal && (
              <ConfirmDialog
                toggle={showDeleteModal}
                title="Cancellazione Dashboard"
                message={`Vuoi cancellare la dashboard ${selectedItem?.name}?`}
                confirmCb={dialogConfirmModalHandler}
                cancelCb={dialogCancelModalHandler}
              ></ConfirmDialog>
            )}
          </div>
        </Panel>
      </PanelGroup>
    </Layout>
  );
}

export default DashboardsPage;
