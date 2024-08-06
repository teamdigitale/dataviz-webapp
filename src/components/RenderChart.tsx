import BasicChart from './charts/BasicChart';
import PieChart from './charts/PieChart';
import GeoMapChart from './charts/GeoMapChart';
import { getPieValues, getBasicValues, getMapValues } from '../lib/utils';
import { useEffect, useState, useRef } from 'react';
import { downloadPng } from '../lib/downloadUtils';

function RenderChart(ds) {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [ds.config]);

  let id = ds.id;
  const wrapRef = useRef(null);
  const [echartInstance, setEchartInstance] = useState(null);
  const [width, setWidth] = useState(null);
  const isMobile = width && width <= 480;

  function setDimension() {
    setWidth(wrapRef?.current?.clientWidth);
  }

  useEffect(() => {
    window.addEventListener('resize', setDimension);
    setDimension();
    return () => {
      window.removeEventListener('resize', setDimension);
    };
  }, []);

  if (loading) return null;
  return (
    <div className="w-full min-height-[800px]">
      <div className="w-full min-height-[800px]">
        <div ref={wrapRef}>
          {ds && (
            <>
              {(ds.chart === 'bar' || ds.chart === 'line') && (
                <BasicChart
                  id={ds.id}
                  data={getBasicValues(ds)}
                  isMobile={isMobile}
                  setEchartInstance={setEchartInstance}
                />
              )}
              {ds.chart === 'pie' && (
                <PieChart
                  id={ds.id}
                  data={getPieValues(ds)}
                  isMobile={isMobile}
                  setEchartInstance={setEchartInstance}
                />
              )}
              {ds.chart === 'map' && (
                <GeoMapChart
                  id={ds.id}
                  data={getMapValues(ds)}
                  isMobile={isMobile}
                  setEchartInstance={setEchartInstance}
                />
              )}
            </>
          )}
        </div>
      </div>
      <button
        className="mid-button-link"
        title={'Scarica PNG'}
        aria-label={'Scarica PNG'}
        onClick={() =>
          downloadPng(
            echartInstance,
            ds.name || `${ds.chart}-chart-pic-${ds.id}-${Date.now()}`
          )
        }
      >
        {'Scarica'} PNG
        <svg
          className="icon icon-sm icon-primary ms-1"
          focusable="false"
          aria-label={`Scarica PNG`}
          role="img"
        >
          <use href="/images/sprite.svg#it-download"></use>
        </svg>
      </button>
    </div>
  );
}

export default RenderChart;
