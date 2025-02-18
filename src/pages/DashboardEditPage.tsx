import React from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import { Link, useParams } from "react-router-dom";
import useSWR from "swr";
import Layout from "../components/layout";
import Loading from "../components/layout/Loading";
import * as api from "../lib/dashaboard-api";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

function DashboardEditPage() {
  const { id } = useParams();
  const { data, error, isLoading } = useSWR(`${id}`, api.findById);
  const cols = { lg: 4, md: 2, sm: 1, xs: 1, xxs: 1 };

  const [breakpoint, setBreakpoint] = React.useState("lg");
  const [layout, setLayout] = React.useState([]);

  React.useEffect(() => {
    console.log("effect", data);
    if (data) {
      setLayout(data.slots.map((s: { settings: any }) => s.settings));
    }
  }, [isLoading]);

  return (
    <Layout>
      <div>
        <Link to={"/dashboards"}>Torna alla lista</Link>
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

            <ResponsiveReactGridLayout
              // onDrop={(l: any) => {
              //   console.log("on drop", l);
              // }}
              onLayoutChange={(l: any) => {
                console.log("layout change", l);
                setLayout(l);
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
              rowHeight={60}
            >
              {layout.map((item: { i: string }) => (
                <div className="react-grid-item" key={item.i}>
                  {/* {item.i === "item-4" && <RenderChart {...(data as any)} />} */}
                  {item.i}
                </div>
              ))}
            </ResponsiveReactGridLayout>

            <span>{JSON.stringify(data)}</span>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default DashboardEditPage;
