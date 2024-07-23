import {
  Button,
  Col,
  Container,
  Nav,
  NavItem,
  NavLink,
  Row,
} from 'design-react-kit';
import { useState } from 'react';
import { getAvailablePalettes, getPalette, transposeData } from '../lib/utils';
import DataTable from '../components/DataTable';
import RenderChart from '../components/RenderChart';

import TransformSource from '../components/TransformSource';
import useStoreState from '../lib/store';
import GenerateRandomData from '../components/GenerateRandomData';
import LoadSource from '../components/LoadSource';
import CSVUpload from '../components/CSVUpload';
import SelectChart from '../components/SelectChart';
import ChartOptions from '../components/ChartOptions';

function Home() {
  const [state, send] = useState('INPUT.UPLOAD');
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
    send('CHOOSE' as any);
  }
  function matches(state, value) {
    return state.indexOf(value) > -1;
  }

  return (
    <div>
      <Row>
        <Col sm="2">
          <Container>
            <Button onClick={() => send('INPUT.UPLOAD')}>1 - INPUT DATA</Button>
            {matches(state, 'INPUT') && (
              <div style={{ marginLeft: '2rem' }}>
                <Button onClick={() => send('INPUT.UPLOAD')}>
                  Upload File
                </Button>
                <Button onClick={() => send('INPUT.GENERATE')}>
                  Generate Data
                </Button>
                <Button onClick={() => send('INPUT.TRANSFORM')}>
                  Load from Url
                </Button>
              </div>
            )}
            <div>
              <Button onClick={() => send('CHOOSE')}>2 - CHOOSE CHART</Button>
            </div>
            <div>
              <Button onClick={() => send('SETTINGS')}>
                3 - CHART OPTIONS
              </Button>
            </div>
          </Container>
        </Col>
        <Col sm="10">
          <div style={{ background: 'light-gray', margin: '10px auto' }}>
            <div>
              {matches(state, 'UPLOAD') && (
                <div>
                  <h4>Upload your data</h4>
                  <CSVUpload setData={(d: any) => setData(d)} />
                </div>
              )}
              {matches(state, 'GENERATE') && (
                <div>
                  <h4>Generate data</h4>
                  <GenerateRandomData setData={setData} />
                </div>
              )}
              {matches(state, 'TRANSFORM') && (
                <div>
                  <h4>Load remote data</h4>
                  <LoadSource setRawData={setRawData} />
                </div>
              )}
            </div>

            {matches(state, 'CHOOSE') && (
              <div>
                <SelectChart setChart={setChart} chart={chart} />
              </div>
            )}

            {matches(state, 'SETTINGS') && (
              <div>
                <ChartOptions
                  config={config}
                  setConfig={setConfig}
                  chart={chart}
                  numSeries={(data as any)?.length - 1 || 0}
                />
              </div>
            )}

            {state === 'TRANSFORM' && rawData && (
              <div>
                <DataTable data={rawData} reset={reset} transpose={transpose} />
                {/* <TransformSource setData={setData} rawData={rawData} /> */}
              </div>
            )}

            {data && data[0] && (
              <div style={{ maxWidth: 1200 }}>
                <div className="shadow-lg p-5">
                  <RenderChart chart={chart} data={data} config={config} />
                </div>
                <DataTable data={data} reset={reset} transpose={transpose} />
              </div>
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Home;
