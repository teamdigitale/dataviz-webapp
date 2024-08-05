import { useState } from 'react';
import { getAvailablePalettes, getPalette, transposeData } from '../lib/utils';
import DataTable from '../components/DataTable';

import useStoreState from '../lib/store';
import GenerateRandomData from '../components/GenerateRandomData';
import LoadSource from '../components/LoadSource';
import { downloadCSV } from '../lib/downloadUtils';

function Home() {
  const config = useStoreState((state) => state.config);
  const setConfig = useStoreState((state) => state.setConfig);
  const data = useStoreState((state) => state.data);
  const setData = useStoreState((state) => state.setData);
  const rawData = useStoreState((state) => state.rawData);
  const [activeTab, toggleTab] = useState('1');

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
    setData(d);
  }

  return (
    <div>
      {activeTab}
      <button
        onClick={(e) => {
          e.preventDefault();
          toggleTab('1');
        }}
      >
        Generate data
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          toggleTab('2');
        }}
      >
        Load remote data
      </button>
      <>
        <h4>Generate data</h4>
        <GenerateRandomData setData={setData} />
      </>
      <>
        <h4>Load remote data</h4>
        <LoadSource setRawData={setData} />
      </>

      {data && (
        <div>
          <h1> DATA</h1>
          <DataTable
            data={data}
            reset={reset}
            transpose={transpose}
            download={() => {
              downloadCSV(data, 'data');
            }}
          />
        </div>
      )}
    </div>
  );
}

export default Home;
