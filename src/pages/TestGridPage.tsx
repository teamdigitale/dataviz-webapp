import { useState } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
const ResponsiveReactGridLayout = WidthProvider(Responsive);
import Layout from "../components/layout";

export default function Landing() {
  const cols = { lg: 4, md: 3, sm: 2, xs: 1 };
  const [breakPoint, setBreakpoint] = useState("lg");
  const defaultItems = [
    "What is skishu?",
    "Skishu is you divinity...",
    "Shamalaya?",
    "Yes we can ....",
    "Who am I?",
    "Roots of creation...",
    "hey you!",
    "bro",
    "man",
    "hey yo bro",
    "wtf",
  ].map((txt, index) => {
    return { id: "" + (Date.now() + index), txt };
  });
  const [items, setItems] = useState(defaultItems);

  function generateRandomWord() {
    const minLength = 3,
      maxLength = 6;
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    const wordLength =
      Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
    let word = "";
    for (let i = 0; i < wordLength; i++) {
      word += alphabet[Math.floor(Math.random() * alphabet.length)];
    }
    return word;
  }

  function generateLayout(numCols: number) {
    return items.map((item, index) => {
      const x = index % numCols;
      const y = Math.floor(index / numCols);
      return {
        x,
        y,
        w: 1,
        h: 1,
        i: "" + item.id,
        static: false,
      };
    });
  }
  let layouts = {
    lg: generateLayout(cols["lg"]),
    md: generateLayout(cols["md"]),
    sm: generateLayout(cols["sm"]),
    xs: generateLayout(cols["xs"]),
  };

  function removeItem(id: any) {
    console.log("remove item", id);
    setItems((p) => p.filter((i) => i.id !== id));
  }

  function generateItem() {
    const newItem = { id: "" + Date.now(), txt: generateRandomWord() };
    console.log("newItem", newItem);
    setItems((prev: any) => [...prev, newItem]);
  }

  return (
    <Layout>
      <div className="w-full">
        <div>
          <div>breakPoint: {breakPoint}</div>
          <button className="btn btn-primary" onClick={() => generateItem()}>
            Add Item
          </button>
        </div>
        <div className="my-10 bordered border-blue-500 border-2">
          <ResponsiveReactGridLayout
            className="react-grid-layout layout"
            rowHeight={250}
            layouts={layouts}
            // onLayoutChange={(l: any) => setResults(l)}
            onBreakpointChange={(b) => setBreakpoint(b)}
            cols={cols}
          >
            {(layouts as any)?.[breakPoint].map((l: any) => {
              const item = items.find((i) => i.id === l.i);
              return (
                <div
                  className="bordered border-black border-2 p2 bg-gray-100 relative p-4 react-grid-item z-10"
                  key={l.i}
                  data-grid={l}
                >
                  <div>
                    <p className="font-bold">{item?.id}</p>
                    <p className="text">{item?.txt}</p>
                    <p>{` x = ${l.x},y = ${l.y}`}</p>
                  </div>

                  <div className="absolute bottom-2 left-2 ">
                    <button
                      className="btn btn-error btn-md z-20"
                      onClick={() => removeItem(l.i)}
                    >
                      remove Item
                    </button>
                  </div>
                </div>
              );
            })}
          </ResponsiveReactGridLayout>
        </div>
      </div>
    </Layout>
  );
}
