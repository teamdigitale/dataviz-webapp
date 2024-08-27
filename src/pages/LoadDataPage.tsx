import { useEffect } from "react";
import { getAvailablePalettes, getPalette, transposeData } from "../lib/utils";
import DataTable from "../components/DataTable";

import useStoreState from "../lib/store";
import LoadSource from "../components/LoadSource";
import { downloadCSV, dataToCSV } from "../lib/downloadUtils";

function Home() {
  const config = useStoreState((state) => state.config);
  const setConfig = useStoreState((state) => state.setConfig);
  const rawData = useStoreState((state) => state.rawData);
  const setRawData = useStoreState((state) => state.setRawData);

  function reset() {
    setRawData(null);
  }
  function transpose() {
    setRawData(null);
    const transposed = transposeData(rawData);
    // setChart("");
    setTimeout(() => {
      handleChangeData(transposed);
    }, 300);
  }

  function handleChangeData(d: any) {
    if (!config.palette) {
      const numSeries = d.length - 1;
      let palette = getAvailablePalettes(numSeries)[0];
      config.palette = palette;
      config.colors = getPalette(palette);
      setConfig(config);
    }
    setRawData(d);
  }

  useEffect(() => {
    reset();
  }, []);

  return (
    <div>
      <>
        <h4 className="text-4xl">Load remote data</h4>
        <LoadSource setRawData={setRawData} />
      </>
      {rawData && (
        <div>
          <DataTable
            data={rawData}
            reset={reset}
            transpose={transpose}
            download={() => {
              downloadCSV(dataToCSV(rawData), "remote-data-" + Date.now());
            }}
          />
        </div>
      )}
    </div>
  );
}

export default Home;
