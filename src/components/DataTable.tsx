type DataTableProps = {
  data: any;
  reset?: () => void;
  transpose?: () => void;
  download?: () => void;
};

export default function DataTable({
  data,
  reset,
  transpose,
  download,
}: DataTableProps): JSX.Element {
  let max = 100;

  function isBig(rows, cols) {
    return rows > 10 || cols > 10;
  }
  return (
    <>
      {data && data[0] && (
        <div>
          <p>{`${data.length} rows, ${data[0].length} columns`}</p>
          <div className="my-4">
            {transpose && (
              <span className="">
                <button
                  className="btn"
                  type="button"
                  onClick={() => transpose()}
                >
                  Traspose
                </button>
              </span>
            )}
            {reset && (
              <span className="mx-3">
                <button className="btn" type="button" onClick={() => reset()}>
                  Reset
                </button>
              </span>
            )}
            {download && (
              <span className="mx-3">
                <button
                  className="btn"
                  type="button"
                  onClick={() => download()}
                >
                  download
                </button>
              </span>
            )}
          </div>
          <div
            style={{
              maxWidth: '700px',
              maxHeight: '350px',
              overflowX: 'scroll',
              overflowY: 'scroll',
            }}
          >
            <table
              className={`table border ${
                isBig(data.length, data[0].length) ? 'table-xs' : ''
              }`}
            >
              <thead>
                <tr key={`row-head`}>
                  {data[0].map((cell, ii) => (
                    <th className={`px-2 `} key={`head-cell-${ii}`}>
                      {cell}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data?.slice(1, max).map((row, index) => {
                  return (
                    <tr key={`row-${index}`}>
                      {row.map((cell, ii) => (
                        <td
                          key={`cell-${ii}`}
                          className={`px-2 ${ii === 0 ? 'font-bold' : ''}`}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}
