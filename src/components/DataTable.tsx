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
  return (
    <>
      {data && data[0] && (
        <div
          style={{
            marginTop: 20,
          }}
        >
          <p>{`${data.length} righe, ${data[0].length} colonne`}</p>
          <div className="my-4">
            {transpose && (
              <span className="">
                <button
                  className="btn"
                  type="button"
                  onClick={() => transpose()}
                >
                  Trasponi
                </button>
              </span>
            )}
            {reset && (
              <span className="ms-3">
                <button className="btn" type="button" onClick={() => reset()}>
                  Reset
                </button>
              </span>
            )}
            {download && (
              <span className="ms-3">
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
              width: '700px',
              height: '350px',
              overflowX: 'scroll',
              overflowY: 'scroll',
            }}
          >
            <table
              style={{
                border: '1px solid ',
                fontSize: 14,
              }}
            >
              <thead>
                <tr key={`row-head`}>
                  {data[0].map((cell, ii) => (
                    <th
                      className={`px-2 border-2 `}
                      key={`head-cell-${ii}`}
                      style={{
                        borderLeft: ii ? '1px solid ' : '',
                        borderBottom: '1px solid ',
                      }}
                    >
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
                          className={`px-2 ${
                            ii === 0 ? 'font-bold border-2 ' : ''
                          }`}
                          style={{
                            borderLeft: ii ? '1px solid ' : '',
                            borderBottom: '1px solid ',
                          }}
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
