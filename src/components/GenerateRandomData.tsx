import { Button, Input } from "design-react-kit";
import { useState } from "react";
import DataTable from "./DataTable";
import { generateItems, fillArray, transposeData } from "../lib/utils";

function GenerateRandomData({ setData }) {
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(9);
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(100);
  const [offset, setOffset] = useState(0);
  const [multiplier, setMultiplier] = useState(1);
  const [generated, setGenerated] = useState(null);

  function generate() {
    const rowLabels = generateItems("SERIE", rows);
    const colLabels = ["_", ...generateItems("T", cols)];

    let matrix = [];
    matrix[0] = colLabels;
    for (let i = 1; i <= rows; i++) {
      matrix[i] = [
        rowLabels[i - 1],
        ...fillArray(cols, min, max).map((v) => (v + offset) * multiplier),
      ];
    }
    setGenerated(matrix);
  }

  function reset() {
    setGenerated(null);
  }

  function transpose() {
    setGenerated((prev) => transposeData(prev));
  }

  return (
    <div className="my-10">
      <div>
        <span>
          <label>ROWS:</label>
          <Input
            type="number"
            placeholder="rows"
            value={rows}
            onChange={(e) => setRows(Number.parseInt(e.target.value))}
          />
        </span>
        <span>
          <label>COLS</label>
          <Input
            type="number"
            placeholder="Cols"
            value={cols}
            onChange={(e) => setCols(Number.parseInt(e.target.value))}
          />
        </span>
      </div>
      <div>
        <span>
          <label> Range Min:</label>
          <Input
            type="number"
            placeholder="min"
            value={min}
            onChange={(e) => setMin(Number.parseInt(e.target.value))}
          />
        </span>
        <span>
          <label>Range Max:</label>
          <Input
            type="number"
            placeholder="Max"
            value={max}
            onChange={(e) => setMax(Number.parseInt(e.target.value))}
          />
        </span>
      </div>
      <div>
        <label>Offset</label>
        <Input
          type="number"
          placeholder="offset"
          value={offset}
          onChange={(e) => setOffset(Number.parseInt(e.target.value))}
        />
        <label>Multiplier</label>
        <Input
          type="number"
          step={0.5}
          placeholder="multiplier"
          value={multiplier}
          onChange={(e) => setMultiplier(Number.parseFloat(e.target.value))}
        />
      </div>

      <Button className="my-5 btn btn-primary" onClick={() => generate()}>
        GENERATE
      </Button>
      {generated && (
        <div className="my-10">
          <div className="w-[500px] overflow-scroll">
            <DataTable data={generated} reset={reset} transpose={transpose} />
          </div>
          <Button
            className="btn btn-primary"
            onClick={() => setData(generated)}
          >
            USE GENERATED DATA
          </Button>
        </div>
      )}
    </div>
  );
}

export default GenerateRandomData;
