import { useState } from 'react';
import { getAvailablePalettes, getPalette, transposeData } from '../lib/utils';
import DataTable from '../components/DataTable';
import RenderChart from '../components/RenderChart';

import useStoreState from '../lib/store';
import CSVUpload from '../components/CSVUpload';
import SelectChart from '../components/SelectChart';
import ChartOptions from '../components/ChartOptions';
import { useMachine } from '@xstate/react';
import stepMachine from '../lib/stepMachine';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import { dataToCSV, downloadCSV } from '../lib/downloadUtils';
import ChartSave from '../components/ChartSave';

function Home() {
  const [state, send] = useMachine(stepMachine);

  const config = useStoreState((state) => state.config);
  const setConfig = useStoreState((state) => state.setConfig);
  const chart = useStoreState((state) => state.chart);
  const setChart = useStoreState((state) => state.setChart);
  const data = useStoreState((state) => state.data);
  const setData = useStoreState((state) => state.setData);
  // const rawData = useStoreState((state) => state.rawData);
  // const setRawData = useStoreState((state) => state.setRawData);
  const setName = useStoreState((state) => state.setName);
  const name = useStoreState((state) => state.name);
  const id = useStoreState((state) => state.id);
  const setId = useStoreState((state) => state.setId);
  const list = useStoreState((state) => state.list);

  const addItem = useStoreState((state) => state.addItem);
  const updateItem = useStoreState((state) => state.updateItem);
  const resetState = useStoreState((state) => state.reset);
  const loadItem = useStoreState((state) => state.load);

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
  const haveData = data && data[0].length > 0 ? true : false;

  function handleUpload(d: any) {
    setData(d);
    send({ type: 'NEXT' });
  }

  function handleSaveItem({ name, id }: { name: string; id: string }) {
    setName(name);
    setId(id);

    const item = {
      id,
      name,
      chart,
      config,
      data,
    };

    const exists = list?.find((item) => item.id === id);
    if (!exists) {
      addItem(item as any);
    } else {
      updateItem(item as any);
    }
    resetState();
    send({ type: 'NEXT' });
  }

  return (
    <PanelGroup direction="horizontal" className="w-full">
      <Panel defaultSize={10} minSize={10} className="bg-base-100">
        <div className="p-4 block">
          <div className="text-xl my-5">{state.value as string}</div>
          <div className="my-2">
            <button
              className="btn btn-outline"
              onClick={() =>
                send({ type: state.matches('idle') ? 'NEXT' : 'PREV' })
              }
            >
              1 - INPUT DATA
            </button>
          </div>
          <div className="my-2">
            <button
              disabled={!data}
              className="btn btn-outline"
              onClick={() =>
                send({ type: state.matches('input') ? 'NEXT' : 'PREV' })
              }
            >
              2 - CONFIGURE CHART
            </button>
          </div>
          <div className="my-2">
            <button
              disabled={!data}
              className="btn btn-outline"
              onClick={() =>
                send({
                  type: state.matches('config') ? 'NEXT' : 'PREV',
                })
              }
            >
              3 - SAVE / EXPORT
            </button>
          </div>
        </div>
      </Panel>
      <PanelResizeHandle className="bg-primary w-1" />
      <Panel minSize={20} className="bg-base-100">
        <div className="p-4">
          {state.matches('idle') && (
            <div>
              <h4 className="text-4xl font-bold">Welcome</h4>
              {list?.map((item) => (
                <div key={item.id} className="my-2">
                  <button
                    className="btn btn-outline"
                    onClick={() => {
                      loadItem(item);
                      send({ type: 'CONFIG' });
                    }}
                  >
                    {item.name}
                  </button>
                </div>
              ))}
            </div>
          )}

          {state.matches('input') && (
            <div>
              <h4>Upload your data</h4>
              <CSVUpload setData={(d: any) => handleUpload(d)} />
            </div>
          )}

          {state.matches('config') && (
            <div>
              <SelectChart setChart={setChart} chart={chart} />
              <ChartOptions
                config={config}
                setConfig={setConfig}
                chart={chart}
                numSeries={(data as any)?.length - 1 || 0}
              />
            </div>
          )}
          {state.matches('done') && (
            <div>
              Give a name to your chart and save it
              <ChartSave
                chart={chart}
                name={name || ''}
                id={id || ''}
                save={(obj) => handleSaveItem(obj)}
              />
            </div>
          )}
        </div>
      </Panel>
      {haveData && (
        <>
          <PanelResizeHandle className="bg-primary w-1" />
          <Panel defaultSize={30} minSize={20}>
            <div className="p-4">
              <DataTable
                data={data}
                reset={reset}
                transpose={transpose}
                download={() => {
                  downloadCSV(dataToCSV(data), 'selected-data-' + Date.now());
                }}
              />
              {chart && (
                <>
                  <RenderChart chart={chart} data={data} config={config} />
                  {config && chart && (
                    <div className="w-full flex justify-end">
                      <button
                        className="my-5 btn btn-primary"
                        onClick={() => send({ type: 'NEXT' })}
                      >
                        SAVE / EXPORT
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </Panel>
        </>
      )}
    </PanelGroup>
  );
}

export default Home;
