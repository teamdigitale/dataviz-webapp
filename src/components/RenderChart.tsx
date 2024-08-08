import BasicChart from './charts/BasicChart';
import PieChart from './charts/PieChart';
import GeoMapChart from './charts/GeoMapChart';
import { getPieValues, getBasicValues, getMapValues } from '../lib/utils';
import { useEffect, useState, useRef } from 'react';
import { downloadPng } from '../lib/downloadUtils';

function RenderChart(ds: any) {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [ds.config]);

  const wrapRef = useRef(null);
  const [echartInstance, setEchartInstance] = useState(null);
  const [width, setWidth] = useState<number>(500);
  const isMobile = width <= 480 ? true : false;

  function setDimension() {
    const element: any = wrapRef.current;
    if (!element) return;
    let w: number = 500;
    try {
      w = element.clientWidth || element.getBoundingClientRect().width;
    } catch (error) {}
    if (w) setWidth(w);
  }

  useEffect(() => {
    window.addEventListener('resize', setDimension);
    setDimension();
    return () => {
      window.removeEventListener('resize', setDimension);
    };
  }, [wrapRef]);

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
        className="btn btn-primary btn-outline"
        title={'Download PNG'}
        aria-label={'Download PNG'}
        onClick={() =>
          downloadPng(
            echartInstance,
            ds.name || `${ds.chart}chart-pic-${Date.now()}`
          )
        }
      >
        {'Download'} PNG
      </button>
    </div>
  );
}

export default RenderChart;
