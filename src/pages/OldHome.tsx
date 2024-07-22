import { Button, Col, Container, Row } from "design-react-kit";
import { useState } from "react";
import { getAvailablePalettes, getPalette, transposeData } from "../lib/utils";
import DataTable from "../components/DataTable";
import RenderChart from "../components/RenderChart";

import TransformSource from "../components/TransformSource";
import useStoreState from "../lib/store";
import GenerateRandomData from "../components/GenerateRandomData";
import LoadSource from "../components/LoadSource";
import CSVUpload from "../components/CSVUpload";
import SelectChart from "../components/SelectChart";
import ChartOptions from "../components/ChartOptions";

function Home() {
  const [state, send] = useState("UPLOAD");
  const config = useStoreState((state) => state.config);
  const setConfig = useStoreState((state) => state.setConfig);
  const chart = useStoreState((state) => state.chart);
  const setChart = useStoreState((state) => state.setChart);
  const data = useStoreState((state) => state.data);
  const setData = useStoreState((state) => state.setData);
  const rawData = useStoreState((state) => state.rawData);
  const setRawData = useStoreState((state) => state.setRawData);

  function reset() {
    setData(null);
  }
  function transpose() {
    setData(null);
    const transposed = transposeData(data);
    // setChart("");
    setTimeout(() => {
      handleChangeData(transposed);
    }, 300);
  }

  function handleChangeData(d) {
    if (!config.palette) {
      const numSeries = d.length - 1;
      let palette = getAvailablePalettes(numSeries)[0];
      config.palette = palette;
      config.colors = getPalette(palette);
      setConfig(config);
    }
    // setChart("");
    setData(d);
    send("CHOOSE" as any);
  }
  function matches(state, value) {
    return value === state;
  }

  return (
    <Container>
      <Row className="border-2">
        <Col lg="4">
          <div>
            <Button onClick={() => send("GENERATE")}>1 - GENERATE DATA</Button>
            {matches(state, "GENERATE") && (
              <div>
                <GenerateRandomData setData={setData} />
              </div>
            )}
          </div>
          <div>
            <Button onClick={() => send("TRANSFORM")}>
              1 - TRANSFORM SOURCE
            </Button>
            {matches(state, "TRANSFORM") && (
              <div>
                <LoadSource setRawData={setRawData} />
              </div>
            )}
          </div>
          <div>
            <Button onClick={() => send("UPLOAD")}>1 - UPLOAD DATA</Button>
            {matches(state, "UPLOAD") && (
              <div>
                <CSVUpload setData={(d: any) => setData(d)} />
              </div>
            )}
          </div>
          <div>
            <Button onClick={() => send("CHOOSE")}>2 - CHOOSE CHART</Button>
            {matches(state, "CHOOSE") && (
              <div>
                <SelectChart setChart={setChart} chart={chart} />
              </div>
            )}
          </div>
          <div>
            <Button onClick={() => send("SETTINGS")}>3 - CHART OPTIONS</Button>
            {matches(state, "SETTINGS") && (
              <div>
                <ChartOptions
                  config={config}
                  setConfig={setConfig}
                  chart={chart}
                  numSeries={(data as any)?.length - 1 || 0}
                />
              </div>
            )}
          </div>
        </Col>
        <Col lg="8">
          <div>
            {state === "TRANSFORM" && rawData && (
              <div>
                <TransformSource setData={setData} rawData={rawData} />
              </div>
            )}

            {data && data[0] && (
              <div>
                <div className="m-5 shadow-lg">
                  <center>
                    <RenderChart chart={chart} data={data} config={config} />
                  </center>
                </div>
                <DataTable data={data} reset={reset} transpose={transpose} />
              </div>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
