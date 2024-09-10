import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RenderChart from "../components/RenderChart";

const SERVER_HOST = "http://localhost:3003";

function ShowChartPage() {
  const { id } = useParams();
  const [chartData, setChartData] = useState<any>(null);
  useEffect(() => {
    fetch(`${SERVER_HOST}/charts/show/${id}`)
      .then((res) => res.json())
      .then((data) => setChartData(data));
  }, []);

  let description = (chartData as any)?.description ?? "";
  return (
    <div className="">
      <div>ID: {id}</div>
      <h1 className="text-4xl font-bold">
        {`${(chartData as any)?.name ?? "Show Chart"}`}{" "}
      </h1>
      {description && (
        <p dangerouslySetInnerHTML={{ __html: `${description}` }} />
      )}
      <div className="p-4">
        {chartData && <RenderChart {...(chartData as any)} />}
      </div>
    </div>
  );
}

export default ShowChartPage;
