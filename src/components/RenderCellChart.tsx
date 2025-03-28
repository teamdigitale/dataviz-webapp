import type { EChartsType } from "echarts";
import { useEffect, useRef, useState } from "react";
import { getBasicValues, getMapValues, getPieValues } from "../lib/utils";
import BasicChart from "./charts/BasicChart";
import GeoMapChart from "./charts/GeoMapChart";
import PieChart from "./charts/PieChart";

function RenderChart(props: any) {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [props.config]);

  const { fullH, hFactor } = props;

  const wrapRef = useRef(null);
  const [echartInstance, setEchartInstance] = useState<EChartsType | null>(
    null
  );
  const [width, setWidth] = useState<number>(500);
  const isMobile = width <= 480 ? true : false;

  useEffect(() => {
    if (echartInstance && props.getPicture) {
      const dataUrl = (echartInstance! satisfies EChartsType).getDataURL();
      props.getPicture(dataUrl);
    }
  }, [echartInstance]);

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
    window.addEventListener("resize", setDimension);
    setDimension();
    return () => {
      window.removeEventListener("resize", setDimension);
    };
  }, [wrapRef]);

  if (loading) return null;
  // console.log("props", props);
  return (
    <div className="w-full h-full max-height-full">
      <div className={`w-full min-height-[${fullH}]  h-full max-height-full`}>
        <div ref={wrapRef}>
          {props && (
            <>
              {(props.chart === "bar" || props.chart === "line") && (
                <BasicChart
                  id={props.id}
                  data={getBasicValues(props)}
                  isMobile={isMobile}
                  setEchartInstance={setEchartInstance}
                  isFullH={fullH}
                  hFactor={hFactor}
                />
              )}
              {props.chart === "pie" && (
                <PieChart
                  id={props.id}
                  data={getPieValues(props)}
                  isMobile={isMobile}
                  setEchartInstance={setEchartInstance}
                  isFullH={fullH}
                  hFactor={hFactor}
                />
              )}
              {props.chart === "map" && (
                <GeoMapChart
                  id={props.id}
                  data={getMapValues(props)}
                  isMobile={isMobile}
                  setEchartInstance={setEchartInstance}
                  isFullH={fullH}
                  hFactor={hFactor}
                />
              )}
            </>
          )}
        </div>
      </div>
      {/* {echartInstance && (
        <button
          className='btn btn-primary btn-outline btn-sm mb-4'
          title={"Download PNG"}
          aria-label={"Download PNG"}
          onClick={() =>
            // downloadPng(
            //   echartInstance,
            //   props.name || `${props.chart}chart-pic-${Date.now()}`
            // )
            props.getPicture(echartInstance.getDataURL())
          }
        >
          SET PNG
        </button>
      )} */}
    </div>
  );
}

export default RenderChart;
