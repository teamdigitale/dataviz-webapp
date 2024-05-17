import { useState, useTransition } from "react";
import Papa from "papaparse";
import DataTable from "./DataTable";
import { Button, Select } from "design-react-kit";

import { log, transposeData, moveDataColumn } from "../lib/utils";
import { MatrixType } from "../types";

type selectOptionType = {
  value: string;
  label: string;
};

function cleanupValue(v: string | number) {
  if (!v) return 0;
  try {
    const value = parseFloat("" + v);
    return value;
  } catch (error) {
    return 0;
  }
}

function cleanupData(matrix: MatrixType) {
  return matrix.map((row, index) => {
    if (index === 0) return row;
    return row.map((cell, j) => {
      if (j == 0) return cell;
      return cleanupValue(cell);
    });
  });
}

function UploadCSV({ setData }) {
  const [_, startTransition] = useTransition();
  const [rawData, setRawData] = useState<any>(null);
  const [category, setCategory] = useState<selectOptionType | null>(null);
  const [series, setSeries] = useState<selectOptionType[] | []>([]);

  function uploadFile(event) {
    let file = event.target.files[0];

    Papa.parse(file, {
      header: false,
      skipEmptyLines: true,
      complete: (results) => {
        const { data } = results;
        log("RESULTS DATA", data);
        const c = getFirstOfMAtrix(data);
        const category = { value: c, label: c };
        log("CATEGORY", category);
        const cols = getCols(data[0]);
        log("COLS", cols);
        const series = cols.filter((i) => !isSameObject(i, category));
        log("SERIES", series);

        startTransition(() => {
          setRawData(data);
          setCategory(category);
          setSeries(series);
        });
      },
    });
  }

  function isSameObject(a, b) {
    return JSON.stringify(a) === JSON.stringify(b);
  }
  function getFirstOfMAtrix(matrix) {
    return matrix[0][0]?.trim();
  }
  function getCols(cols: string[]) {
    return cols.map((c: string) => {
      const col = c.trim();
      return { value: col, label: col };
    });
  }

  function transpose() {
    const transposed = transposeData(rawData);
    setRawData(transposed);
    const c = getFirstOfMAtrix(transposed);
    const category = { value: c, label: c };
    setCategory(category);
    setSeries(getCols(transposed[0]).filter((i) => !isSameObject(i, category)));
  }

  function filterData() {
    if (!series) return;
    const cols = [category, ...series].map((col) => col.value);
    const filtered = rawData.map((row) => {
      return row.filter((r, i) => {
        return cols.includes(rawData[0][i].trim());
      });
    });
    return filtered;
  }

  function handleChangeCategory(newValue: string) {
    setSeries([]);
    const category = getCols(rawData[0]).find((i) => i.value === newValue);
    setCategory(category);
    setRawData(moveDataColumn(rawData, newValue));
  }

  function handleChangeSerie(options: string[]) {
    console.log("newValues", options);
    const series = getCols(rawData[0]).filter((i: any) =>
      options.map((o) => o).includes(i.value)
    );
    setSeries(series);
  }

  return (
    <div>
      <label style={{ width: "200px" }}>Carica CSV:</label>
      <input
        className="input"
        type="file"
        name="file"
        accept=".csv"
        onChange={(e) => uploadFile(e)}
      />

      {rawData && (
        <div>
          <DataTable
            data={rawData}
            transpose={() => transpose()}
            reset={() => setRawData(null)}
          />
          <label>Seleziona la colonna categoria:</label>
          <select
            name="category"
            id="category"
            // label="category"
            // hint="Selezione la colonna categoria"
            value={category?.value}
            onChange={(e) => handleChangeCategory(e.target.value)}
          >
            {getCols(rawData[0]).map((col) => (
              <option key={col.value} value={col.value}>
                {col.value}
              </option>
            ))}
          </select>
          {category && (
            <>
              <label>Seleziona una o più serie:</label>
              <select
                name="series"
                id="series"
                // label="series"
                // hint="Seleziona una o più serie"
                multiple={true}
                value={series.map((s) => s.value).join(",")}
                onChange={(e) => handleChangeSerie(e.target.value.split(","))}
              >
                {getCols(rawData[0])
                  .filter((i) => !isSameObject(i, category))
                  .map((col) => (
                    <option key={col.value} value={col.value}>
                      {col.value}
                    </option>
                  ))}
              </select>
            </>
          )}

          <div>
            {series && category?.value && series.length > 0 && (
              <Button
                onClick={() => {
                  setData(cleanupData(filterData()));
                }}
              >
                Salva Dati
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default UploadCSV;
