import useStoreState from '../lib/store';
import { transposeData } from '../lib/utils';

import DataTable from '../components/DataTable';
import RenderChart from '../components/RenderChart';
import CSVUpload from '../components/CSVUpload';
import ChartOptions from '../components/ChartOptions';
import SelectChart from '../components/SelectChart';

import { MatrixType } from '../types';
import { useState, useEffect } from 'react';

export default function ChartEditor({ ctx }) {
  const currentValue = JSON.parse(ctx.formValues[ctx.fieldPath] as string) || {
    config: {},
  };

  const saveData = (data: string | null) => {
    if (JSON.stringify(currentValue) !== data) {
      ctx.setFieldValue(ctx.fieldPath, data);
    }
  };

  const config: any = useStoreState((state) => state.config);
  const setConfig = useStoreState((state) => state.setConfig);
  const chart = useStoreState((state) => state.chart);
  const setChart = useStoreState((state) => state.setChart);
  const data = useStoreState<MatrixType>(
    (state) => state.data as unknown as MatrixType
  );
  const setAll = useStoreState((state) => state.setAll);
  const setData = useStoreState((state) => state.setData);

  const [isUploadOpen, setUploadOpen] = useState<boolean>(true);
  const [isChooseOpen, setChooseOpen] = useState<boolean>(false);
  const [isConfigOpen, setConfigOpen] = useState<boolean>(false);

  function str(obj) {
    return JSON.stringify(obj);
  }

  useEffect(() => {
    if (!data && currentValue.data) {
      setAll(currentValue);
      setUploadOpen(false);
    } else if (data) {
      const valueString = JSON.stringify(data);
      const prevValue = JSON.stringify(currentValue?.data || '');
      if (valueString !== prevValue) {
        saveData(str({ chart: '', config: {}, data }));
        setChart('');
        setConfig({});
      }
    }
  }, [data]);

  useEffect(() => {
    if (chart && chart !== currentValue?.chart) {
      saveData(str({ chart, config: {}, data }));
      setConfig({});
      setChooseOpen(false);
      setConfigOpen(true);
    }
  }, [chart]);

  useEffect(() => {
    if (config && data) {
      saveData(str({ chart, config, data }));
    }
  }, [config, data]);

  function doReset() {
    saveData(str({ config: {}, chart: '' }));
    setTimeout(() => {
      setAll({ config: {}, chart: '', data: null });
      setUploadOpen(true);
    }, 1000);
  }

  function handleUploadData(data) {
    saveData(str({ config: {}, chart: '' }));
    setTimeout(() => {
      setData(data);
      setUploadOpen(false);
      setChooseOpen(true);
    }, 500);
  }

  function transpose() {
    const transposed = transposeData(data);
    saveData(str({ config: {}, chart: '', data: transposed }));
    setTimeout(() => {
      setAll({ config: {}, chart: '', data: transposed });
    }, 1000);
  }

  const hasData = data != null && data[0] ? true : false;
  return (
    <div>
      <div>
        <div title="Dati">
          <div style={{ margin: '0 20px 20px' }}>
            <CSVUpload setData={(d) => handleUploadData(d)} />
            {hasData && (
              <div style={{ margin: '20px auto' }}>
                <div>
                  <DataTable
                    data={data}
                    reset={doReset}
                    transpose={transpose}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {hasData && (
          <div title="Tipologia grafico">
            <div style={{ margin: '0 20px 20px' }}>
              <SelectChart chart={chart} setChart={setChart} />
            </div>
          </div>
        )}

        {hasData && chart && (
          <div title="Configurazioni grafico">
            <div style={{ margin: '0 20px 20px' }}>
              <ChartOptions
                config={config}
                setConfig={setConfig}
                chart={chart}
                numSeries={data?.length - 1 || 0}
              />
            </div>
          </div>
        )}

        {currentValue &&
          currentValue.chart &&
          currentValue.data != null &&
          currentValue.data[0] && (
            <div style={{ marginTop: 20 }}>
              <center>{/* <RenderChart ds={currentValue} /> */}</center>
            </div>
          )}
      </div>
    </div>
  );
}
