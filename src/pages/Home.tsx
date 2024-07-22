import { Button, Col, Container, Row } from 'design-react-kit';
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

import type { Step } from '../types';
import Stepper from '../components/Stepper';

function Home() {
  const [state, send] = useState('UPLOAD');
  const config = useStoreState((state) => state.config);
  const setConfig = useStoreState((state) => state.setConfig);
  const chart = useStoreState((state) => state.chart);
  const setChart = useStoreState((state) => state.setChart);
  const data = useStoreState((state) => state.data);
  const setData = useStoreState((state) => state.setData);
  const rawData = useStoreState((state) => state.rawData);
  const setRawData = useStoreState((state) => state.setRawData);

  const steps: Step[] = [
    { name: 'Step 1', id: 'step1', index: 0 },
    { name: 'Step 2', id: 'step2', index: 1 },
    { name: 'Step 3', id: 'step3', index: 2 },
  ];
  const [step, setStep] = useState<Step>(steps[0]);

  function handleChangeStep(step: Step) {
    setStep(step);
    if (step.id === 'step1') {
      send('UPLOAD');
    } else if (step.id === 'step2') {
      send('CHOOSE');
    } else if (step.id === 'step3') {
      send('SETTINGS');
    }
  }

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
    return value === state;
  }

  return (
    <Container>
      <Stepper
        steps={steps}
        currentStep={step}
        handleChangeStep={handleChangeStep}
      >
        <div>{step.name}</div>
      </Stepper>
      <div className="overflow-scroll" style={{ height: '100%', padding: 20 }}>
        {matches(state, 'GENERATE') && (
          <div>
            <GenerateRandomData setData={setData} />
          </div>
        )}

        {matches(state, 'UPLOAD') && (
          <div>
            <CSVUpload setData={(d: any) => setData(d)} />
          </div>
        )}

        {matches(state, 'TRANSFORM') && (
          <div>
            <LoadSource setRawData={setRawData} />
          </div>
        )}
        {state === 'TRANSFORM' && rawData && (
          <div>
            <TransformSource setData={setData} rawData={rawData} />
          </div>
        )}

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
    </Container>
  );
}

export default Home;
