import Papa from "papaparse";

function UploadCSV({ setData }: any) {
  function uploadFile(event: any) {
    let file = event.target.files[0];

    Papa.parse(file, {
      header: false,
      skipEmptyLines: true,
      complete: (results: any) => {
        const { data } = results;
        const c = getFirstOfMAtrix(data);
        const category = { value: c, label: c };
        const cols = getCols(data[0]);
        const series = cols.filter((i) => !isSameObject(i, category));

        setData(data);
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

  return (
    <div className="px-10">
      <div className="m-10 border-2">
        <p>Upload a csv</p>
        <input
          className="input"
          type="file"
          name="file"
          accept=".csv"
          onChange={(e) => uploadFile(e)}
        />
      </div>
    </div>
  );
}

export default UploadCSV;
