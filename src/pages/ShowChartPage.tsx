import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RenderChart from "../components/RenderChart";
import * as api from "../lib/api";

function ShowChartPage() {
  const { id } = useParams();
  const [chartData, setChartData] = useState<any>(null);
  useEffect(() => {
    api.showChart(id as string).then((data) => setChartData(data));
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
