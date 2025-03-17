import React from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import useSWR from "swr";
import RenderChart from "../components/RenderChart";
import { getChart } from "../lib/dashaboard-api";

const ResponsiveReactGridLayout = WidthProvider(Responsive);
const TestGridPage: React.FC = () => {
  const cols = { lg: 4, md: 2, sm: 1, xs: 1, xxs: 1 };
  const [layout, setLayout] = React.useState([
    { i: "item-0", x: 0, y: 0, w: 1, h: 1 },
    { i: "item-1", x: 1, y: 0, w: 2, h: 1 },

    { i: "item-2", x: 3, y: 0, w: 1, h: 1 },

    { i: "item-3", x: 0, y: 1, w: 1, h: 2 },
    { i: "item-4", x: 1, y: 1, w: 3, h: 2 },
  ]);
  const [count, setCount] = React.useState(0);
  const [breakpoint, setBreakpoint] = React.useState("lg");

  function addItem() {
    const xMax = layout.reduce((acc, cur) => (cur.x > acc ? cur.x : acc), 0);
    const yMax = layout.reduce((acc, cur) => (cur.y > acc ? cur.y : acc), 0);
    setLayout([
      ...layout,
      {
        i: `gen-${count + 1}`,
        x: xMax,
        y: yMax,
        w: 1,
        h: 1,
      },
    ]);
    setCount((c) => c + 1);
  }
  function deleteItem(k: string) {
    console.log("delete", k);
    setLayout((l) => l.filter((i) => i.i !== k));
  }

  const id = "cm74pz8p5000157p7l6z6esbe";
  const { data, error, isLoading } = useSWR(`${id}`, getChart);

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <div className="w-[90vw] mx-auto">
      <div className="flex flex-wrap">
        <button
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
        {layout.map((item) => (
          <div className="react-grid-item" key={item.i}>
            {item.i === "item-4" && <RenderChart {...(data as any)} />}
            {item.i}
          </div>
        ))}
      </ResponsiveReactGridLayout>
      {JSON.stringify(layout, undefined, 4)}
    </div>
  );
};

export default TestGridPage;
