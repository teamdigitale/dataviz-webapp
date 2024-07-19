import { Button } from "design-react-kit";

export default function DataTable({ data, reset, transpose }): JSX.Element {
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
          <div
            style={{
              width: "700px",
              height: "350px",
              overflowX: "scroll",
              overflowY: "scroll",
            }}
          >
            <table
              style={{
                border: "1px solid lightgray",
                fontSize: 14,
              }}
            >
              <thead>
                <tr key={`row-head`}>
                  {data[0].map((cell, ii) => (
                    <th
                      className={`px-2 border-2 bg-gray-100  border-lightgray`}
                      key={`head-cell-${ii}`}
                      style={{
                        borderLeft: ii ? "1px solid gray" : "",
                        borderBottom: "1px solid gray",
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
                            ii === 0
                              ? "font-bold border-2 bg-gray-100  border-gray"
                              : ""
                          }`}
                          style={{
                            borderLeft: ii ? "1px solid gray" : "",
                            borderBottom: "1px solid gray",
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
          <div className="my-4">
            {transpose && (
              <span className="">
                <Button type="button" onClick={() => transpose()} size="xs">
                  Trasponi
                </Button>
              </span>
            )}
            {reset && (
              <span className="ms-3">
                <Button type="button" onClick={() => reset()} size="xs">
                  Reset
                </Button>
              </span>
            )}
          </div>
        </div>
      )}
    </>
  );
}
