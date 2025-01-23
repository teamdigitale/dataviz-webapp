import React from "react";
import GridLayout, { WidthProvider, Responsive } from "react-grid-layout";

const ResponsiveReactGridLayout = WidthProvider(Responsive);
const TestGridPage: React.FC = () => {
  let layout = [
    { i: "item-0", x: 0, y: 0, w: 1, h: 1 },
    { i: "item-1", x: 1, y: 0, w: 2, h: 1 },
    { i: "item-2", x: 3, y: 0, w: 1, h: 1 },

    { i: "item-3", x: 0, y: 1, w: 1, h: 2 },
    { i: "item-4", x: 1, y: 1, w: 3, h: 2 },
  ];

  const cols = { lg: 4, md: 2, sm: 1, xs: 1, xxs: 1 };
  const [result, setResult] = React.useState({ lg: layout });
  const [breakpoint, setBreakpoint] = React.useState<string>("lg");

  function addItem() {
    const newLayout = {
      i: `gen-${layout.length}+1`,
      x: 0,
      y: 0,
      w: 1,
      h: 1,
    };
    result["lg"].push(newLayout);
    setResult(result);
  }
  function deleteItem(k: string) {
    const newLayout = result.lg.filter((i) => i.i !== k);
    setResult({ lg: newLayout });
  }

  return (
    <div className='w-[90vw] mx-auto'>
      <div>
        <pre>
          <small>{JSON.stringify(result)}</small>
        </pre>
        <p>breakpoint: {breakpoint}</p>

        <button className='btn btn-primary' onClick={() => addItem()}>
          Add +
        </button>
      </div>

      <ResponsiveReactGridLayout
        onDrop={(l: any) => setResult({ lg: l })}
        onLayoutChange={(l: any, layouts: any) => {
          console.log(l, layouts);
        }}
        onBreakpointChange={(b: any) => {
          setBreakpoint(b);
        }}
        className='rg-wrapper'
        layouts={result}
        cols={cols}
        margin={[10, 10]}
        rowHeight={60}
      >
        {layout.map((item) => (
          <div
            className='border-primary border-2 rouded text-primary'
            key={item.i}
          >
            {item.i}
            <button
              className='btn btn-error'
              onClick={() => deleteItem(item.i)}
            >
              remove
            </button>
          </div>
        ))}
      </ResponsiveReactGridLayout>
    </div>
  );
};

export default TestGridPage;
