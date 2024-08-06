import { getAvailablePalettes, getPalette, transposeData } from '../lib/utils';
import DataTable from '../components/DataTable';

import useStoreState from '../lib/store';
import LoadSource from '../components/LoadSource';
import { downloadCSV, dataToCSV } from '../lib/downloadUtils';

function Home() {
  const config = useStoreState((state) => state.config);
  const setConfig = useStoreState((state) => state.setConfig);
  const data = useStoreState((state) => state.data);
  const setData = useStoreState((state) => state.setData);
  const rawData = useStoreState((state) => state.rawData);

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
      <>
        <h4 className="text-4xl">Load remote data</h4>
        <LoadSource setRawData={setData} />
      </>
      {data && (
        <div>
          <DataTable
            data={data}
            reset={reset}
            transpose={transpose}
            download={() => {
              downloadCSV(dataToCSV(data), 'remote-data-' + Date.now());
            }}
          />
        </div>
      )}
    </div>
  );
}

export default Home;
