import React from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import { Link, useParams } from "react-router-dom";
import useSWR from "swr";
import Layout from "../components/layout";
import Loading from "../components/layout/Loading";
import RenderChart from "../components/RenderCellChart";
import * as api from "../lib/dashaboard-api";
import useDashboardViewStore, {
  TChart,
  TLayoutItem,
} from "../store/dashboard-view.store";

const ResponsiveReactGridLayout = WidthProvider(Responsive);
const cols = { lg: 4, md: 2, sm: 1, xs: 1, xxs: 1 } as const;

function DashboardViewPage() {
  const { id } = useParams();
  const { data, error, isLoading } = useSWR(`${id}`, api.findById);
  const { onDataChange, layout, charts, name, description } =
    useDashboardViewStore();

  React.useEffect(() => {
    console.log("effect", data);
    if (data) {
      const layout = data.slots.map(
        (s: { settings: TLayoutItem; chart: TChart }) => {
          return {
            ...s.settings,
            chart: s.chart,
            static: true,
            resizeHandles: undefined,
          };
        }
      );
      const charts = layout.reduce((p: any, c: { i: any; chart: any }) => {
        return { ...p, [c.i]: c.chart };
      }, {});

      const { name, description } = data;

      onDataChange({ charts, layout, name, description });
    }
  }, [data]);

  return (
    <Layout>
      <div className="flex justify-between items-center">
        <Link to={"/dashboards"} className="text-blue-500 hover:underline">
          Torna alla lista
        </Link>
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
            <h1 className="text-4xl font-bold">{name}</h1>
            <h4 className="text-xl">{description}</h4>
            <div className="relative border min-h-[60vh]">
              <ResponsiveReactGridLayout
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
                    {charts && charts[item.i] && (
                      <RenderChart {...(charts[item.i] as any)} fullH={360} />
                    )}
                  </div>
                ))}
              </ResponsiveReactGridLayout>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default DashboardViewPage;
