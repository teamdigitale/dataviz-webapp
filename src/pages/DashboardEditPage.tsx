import React from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import { Link, useParams } from "react-router-dom";
import useSWR from "swr";
import Layout from "../components/layout";
import Dialog from "../components/layout/Dialog";
import Loading from "../components/layout/Loading";
import RenderChart from "../components/RenderCellChart";
import * as api from "../lib/dashaboard-api";
import { updateSlots } from "../lib/dashaboard-api";

type TChart = any;

type TLayoutItem = {
  i: `item-${number}`;
  x: number;
  y: number;
  w: number;
  h: number;
};

const ResponsiveReactGridLayout = WidthProvider(Responsive);
const cols = { lg: 4, md: 2, sm: 1, xs: 1, xxs: 1 } as const;

function DashboardEditPage() {
  console.log("DashboardEdit");
  const { id } = useParams();
  const { data, error, isLoading, mutate } = useSWR(`${id}`, api.findById, {
    revalidateOnFocus: false,
  });
  const [breakpoint, setBreakpoint] = React.useState("lg");
  const [layout, setLayout] = React.useState<Array<TLayoutItem>>([]);
  const [show, setShow] = React.useState(false);
  const [updatedLayout, setUpdatedLayout] = React.useState<Array<TLayoutItem>>(
    []
  );

  const [charts, setCharts] = React.useState<Record<string, TChart>>({});

  function addChart() {
    console.log("addChart");
  }

  function addItem() {
    const xMax = layout.reduce((acc, cur) => (cur.x > acc ? cur.x : acc), 0);
    const yMax = layout.reduce((acc, cur) => (cur.y > acc ? cur.y : acc), 0);
    const count = layout.length ?? 0;
    const i = `item-${count}` as `item-${number}`;
    const l = {
      i,
      x: xMax,
      y: yMax,
      w: 1,
      h: 1,
    };
    const newLayout = [...layout, l];
    setLayout(newLayout);
    setUpdatedLayout(newLayout);
    setShow(true);
  }
  function deleteItem(id: string) {
    console.log("delete", id);
    setLayout((l) => l.filter((i) => i.i !== id));
    setUpdatedLayout((l) => l.filter((i) => i.i !== id));
  }

  async function save() {
    console.log(updatedLayout);
    const body = {
      slots: updatedLayout.map((l) => ({
        chartId: charts[l.i].id,
        settings: {
          i: l.i,
          w: l.w,
          h: l.h,
          x: l.x,
          y: l.y,
        },
      })),
    };
    console.log(body);
    const response = await updateSlots(id!, body);
    console.log(response);

    if (response) {
      reload();
    }
  }

  function reset() {
    reload();
  }

  function reload() {
    console.log("reload");
    mutate();
  }

  React.useEffect(() => {
    console.log("effect", data);
    if (data) {
      const layout = data.slots.map(
        (s: { settings: TLayoutItem; chart: TChart }) => {
          console.log(s.settings);
          return {
            ...s.settings,
            chart: s.chart,
          };
        }
      );
      const charts = layout.reduce((p: any, c: { i: any; chart: any }) => {
        return { ...p, [c.i]: c.chart };
      }, {});
      setCharts(charts);
      setLayout(layout);
    }
  }, [data]);

  return (
    <Layout>
      <div className="flex justify-between items-center">
        <Link to={"/dashboards"} className="text-blue-500 hover:underline">
          Torna alla lista
        </Link>
        <div className="ml-auto flex space-x-2">
          <button onClick={() => reset()} className="btn btn-primary">
            Reset
          </button>
          <button onClick={() => save()} className="btn btn-primary">
            Salva
          </button>
        </div>
      </div>
      <div className="">
        {isLoading && <Loading />}
        {error && (
          <div role="alert" className="alert alert-error">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{error.message}</span>
          </div>
        )}
        {data && (
          <div>
            <h1 className="text-4xl font-bold">{data.name}</h1>
            <h4 className="text-xl">{data.description}</h4>
            <div className="flex flex-wrap items-center">
              <button
                type="button"
                className="m-2 btn btn-xs btn-primary"
                onClick={() => addItem()}
              >
                Add +
              </button>

              {layout
                .sort((a, b) => {
                  if (a.y === b.y) {
                    return a.x - b.x;
                  }
                  return a.y - b.y;
                })
                .map((l) => (
                  <button
                    key={"delete" + l.i}
                    className="m-2 btn btn-xs btn-error"
                    onClick={() => deleteItem(l.i)}
                  >
                    {l.i}
                  </button>
                ))}
            </div>
            <div className="relative border min-h-[60vh]">
              <ResponsiveReactGridLayout
                onLayoutChange={(l: any) => {
                  console.log("layout change", l);
                  console.log(layout, l);
                  setUpdatedLayout(l);
                }}
                onBreakpointChange={(breakpoint, columns) => {
                  console.log("breakpoint", breakpoint);
                  console.log("columns", columns);
                  setBreakpoint(breakpoint);
                }}
                className="react-grid-layout"
                layouts={{
                  lg: layout,
                }}
                cols={cols}
                margin={[10, 10]}
                rowHeight={360}
              >
                {layout.map((item) => (
                  <div className="react-grid-item overflow-hidden" key={item.i}>
                    <p>{item.i}</p>
                    {charts[item.i] ? (
                      <RenderChart {...(charts[item.i] as any)} fullH={360} />
                    ) : (
                      <button
                        type="button"
                        className="m-2 btn btn-xs btn-primary"
                        onClick={() => addChart()}
                      >
                        Add Chart +
                      </button>
                    )}
                  </div>
                ))}
              </ResponsiveReactGridLayout>
            </div>
            {/* <div className='overflow-y-scroll h-[250px]'>
              <small>
                <pre>{layout && JSON.stringify(layout, null, 2)}</pre>
              </small>
            </div> */}
          </div>
        )}
      </div>
      <Dialog
        toggle={show}
        title="Embed This Chart"
        callback={() => setShow(false)}
      >
        <div className="mockup-code">
          <pre data-prefix="">
            <code>{show}</code>
          </pre>
        </div>
      </Dialog>
    </Layout>
  );
}

export default DashboardEditPage;
