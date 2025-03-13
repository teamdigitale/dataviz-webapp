import React from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import { Link, useParams } from "react-router-dom";
import Layout from "../components/layout";
import Dialog from "../components/layout/Dialog";
import Loading from "../components/layout/Loading";
import RenderChart from "../components/RenderCellChart";
import * as api from "../lib/dashaboard-api";
import { updateSlots } from "../lib/dashaboard-api";
import useDashboardEditStore, { TChart } from "../store/dashboard-edit.store";

interface ChartSelectionProps {
  charts: Record<string, TChart>;
  onSelect: (chart: TChart) => void;
}

function ChartSelection(props: ChartSelectionProps) {
  const [charts, setCharts] = React.useState<Array<TChart>>([]);
  const [chart, setChart] = React.useState<TChart>();

  const mergeCharts = (charts: Array<TChart>) => {
    const idsToRemove = new Set(Object.values(props.charts).map((m) => m.id));
    const filteredCharts = charts.filter((c) => !idsToRemove.has(c.id));
    setCharts(filteredCharts);
  };

  async function fetchCharts() {
    //setLoading(true);
    try {
      const data = await api.getCharts();
      mergeCharts(data);
    } catch (error) {
    } finally {
      //setLoading(false);
    }
  }

  React.useEffect(() => {
    fetchCharts();
  }, []);

  return (
    <div>
      {charts && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
          }}
        >
          <label style={{ width: "200px" }}>Select a chart type:</label>
          <select
            className="select select-primary my-2 p-2"
            style={{ width: "100%" }}
            value={chart}
            onChange={(e) => {
              const chartId = e.target.value;
              setChart(chartId || "");
              const chart = charts.find((c) => c.id === chartId);
              props.onSelect(chart);
            }}
          >
            <option value="">{`-seleziona un grafico-`}</option>
            {charts.map((c, index) => {
              return (
                <option key={`${c.id}-${index}`} value={c.id}>
                  {c.name}
                </option>
              );
            })}
          </select>
        </div>
      )}
    </div>
  );
}

const ResponsiveReactGridLayout = WidthProvider(Responsive);
const cols = { lg: 4, md: 2, sm: 1, xs: 1, xxs: 1 } as const;

function DashboardEditPage() {
  console.log("DashboardEdit");
  const { id } = useParams();
  // const { data, error, isLoading, mutate } = useSWR(`${id}`, api.findById, {
  //   revalidateOnFocus: false,
  // });

  const {
    layout,
    show,
    updatedLayout,
    charts,
    name,
    description,
    isLoading,
    error,
    setBreakpoint,
    setLayout,
    setSelectedChart,
    setUpdatedLayout,
    setCharts,
    addItem,
    deleteItem,
    showAddModal,
    closeAddModal,
    onDataChange,
    fetchData,
    mutate,
  } = useDashboardEditStore();

  function addChart(item: string) {
    console.log("addChart");
    showAddModal(item);
  }

  function addItemHandler() {
    addItem();
  }

  function deleteItemHandler(id: string) {
    deleteItem(id);
  }

  async function saveHandler() {
    const body = {
      slots: updatedLayout.map((l) => ({
        chartId: charts[l.i]?.id,
        settings: { i: l.i, w: l.w, h: l.h, x: l.x, y: l.y },
      })),
    };
    const response = await updateSlots(id!, body);
    if (response) {
      reload();
    }
  }

  function resetHandler() {
    reload();
  }

  function reload() {
    console.log("reload");
    mutate(id!);
  }

  React.useEffect(() => {
    if (id) {
      fetchData(id);
    }
  }, [fetchData]);

  return (
    <Layout>
      <div className="flex justify-between items-center">
        <Link to="/dashboards" className="text-blue-500 hover:underline">
          Torna alla lista
        </Link>
        <div className="ml-auto flex space-x-2">
          <button onClick={resetHandler} className="btn btn-primary">
            Reset
          </button>
          <button onClick={saveHandler} className="btn btn-primary">
            Salva
          </button>
        </div>
      </div>
      {isLoading && <Loading />}
      {error && (
        <div role="alert" className="alert alert-error">
          {error.message}
        </div>
      )}
      {!isLoading && (
        <>
          <h1 className="text-4xl font-bold">{name}</h1>
          <h4 className="text-xl">{description}</h4>
          <div className="flex flex-wrap items-center">
            <button
              className="m-2 btn btn-xs btn-primary"
              onClick={addItemHandler}
            >
              Add +
            </button>
            {layout.map((l) => (
              <button
                key={l.i}
                className="m-2 btn btn-xs btn-error"
                onClick={() => deleteItemHandler(l.i)}
              >
                {l.i}
              </button>
            ))}
          </div>
          <div className="relative border min-h-[60vh]">
            <ResponsiveReactGridLayout
              onLayoutChange={setUpdatedLayout}
              onBreakpointChange={setBreakpoint}
              className="react-grid-layout"
              layouts={{ lg: layout }}
              cols={cols}
              margin={[10, 10]}
              rowHeight={360}
            >
              {layout.map((item) => (
                <div className="react-grid-item overflow-hidden" key={item.i}>
                  <p>{item.i}</p>
                  {charts[item.i] ? (
                    <RenderChart {...charts[item.i]} fullH={360} />
                  ) : (
                    <button
                      className="m-2 btn btn-xs btn-primary"
                      onClick={() => addChart(item.i)}
                    >
                      Add Chart +
                    </button>
                  )}
                </div>
              ))}
            </ResponsiveReactGridLayout>
          </div>
        </>
      )}
      {show && (
        <Dialog
          toggle={show}
          title="Select a chart"
          callback={() => {
            closeAddModal();
          }}
        >
          <ChartSelection charts={charts} onSelect={setSelectedChart} />
        </Dialog>
      )}
    </Layout>
  );
}

export default DashboardEditPage;
