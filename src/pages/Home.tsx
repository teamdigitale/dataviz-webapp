import { useState } from 'react';
import { getAvailablePalettes, getPalette, transposeData } from '../lib/utils';
import DataTable from '../components/DataTable';
import RenderChart from '../components/RenderChart';

import useStoreState from '../lib/store';
import GenerateRandomData from '../components/GenerateRandomData';
import LoadSource from '../components/LoadSource';
import CSVUpload from '../components/CSVUpload';
import SelectChart from '../components/SelectChart';
import ChartOptions from '../components/ChartOptions';
import { useMachine } from '@xstate/react';
import stepMachine from '../lib/stepMachine';

function Home() {
  const [state, send] = useMachine(stepMachine);
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

  return (
    <div>
      <div>
        <div>
          <button onClick={() => send({ type: 'PREV' })}>PREV</button>
          <button onClick={() => send({ type: 'NEXT' })}>NEXT</button>

          <button
            onClick={() =>
              send({ type: state.matches('idle') ? 'NEXT' : 'PREV' })
            }
          >
            1 - INPUT DATA
          </button>

          {data && (
            <>
              <div>
                <button
                  onClick={() =>
                    send({ type: state.matches('input') ? 'NEXT' : 'PREV' })
                  }
                >
                  2 - CHOOSE CHART
                </button>
              </div>
              <div>
                <button
                  onClick={() =>
                    send({
                      type: state.matches('selection') ? 'NEXT' : 'PREV',
                    })
                  }
                >
                  3 - CHART OPTIONS
                </button>
              </div>
            </>
          )}
        </div>
        <div style={{ background: 'light-gray', margin: '10px auto' }}>
          <h1>{state.value as string}</h1>
          <div>
            {state.matches('input') && (
              <div>
                <h4>Upload your data</h4>
                <CSVUpload setData={(d: any) => setData(d)} />
              </div>
            )}
            {state.matches('generate') && (
              <div>
                <h4>Generate data</h4>
                <GenerateRandomData setData={setData} />
              </div>
            )}
            {state.matches('transform') && (
              <div>
                <h4>Load remote data</h4>
                <LoadSource setRawData={setRawData} />
                {rawData && (
                  <div>
                    <DataTable
                      data={rawData}
                      reset={reset}
                      transpose={transpose}
                    />
                  </div>
                )}
              </div>
            )}
          </div>

          {state.matches('selection') && (
            <div>
              <SelectChart setChart={setChart} chart={chart} />
            </div>
          )}

          {state.matches('config') && (
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
        <div>
          {data && (
            <div style={{ maxWidth: 1200 }}>
              <div className="shadow-lg p-5">
                <RenderChart chart={chart} data={data} config={config} />
              </div>
              <DataTable data={data} reset={reset} transpose={transpose} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
