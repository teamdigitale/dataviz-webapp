import BasicChart from "./charts/BasicChart";
import PieChart from "./charts/PieChart";
import GeoMapChart from "./charts/GeoMapChart";
import { getPieValues, getBasicValues, getMapValues } from "../lib/utils";
import { useEffect, useState, useRef } from "react";
import dayjs from "dayjs";
import type { EChartsType } from "echarts";

function RenderChart(props: any) {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [props.config]);

  const { fullH } = props;

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
    <div className='w-full h-full max-height-full'>
      <div className='p-4'>
        {props.name && <h4 className='text-xl font-bold'>{props.name}</h4>}
        {props.description && (
          <p dangerouslySetInnerHTML={{ __html: `${props.description}` }} />
        )}
        {props.updatedAt && (
          <small>
            Ultimo aggiornamento:{" "}
            {dayjs(props.updatedAt).format("DD/MM/YYYY HH:mm")}
          </small>
        )}
      </div>
      <div className='p-4'>
        <div className='w-full min-height-[500px]  h-full max-height-full'>
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
                  />
                )}
                {props.chart === "pie" && (
                  <PieChart
                    id={props.id}
                    data={getPieValues(props)}
                    isMobile={isMobile}
                    setEchartInstance={setEchartInstance}
                    isFullH={fullH}
                  />
                )}
                {props.chart === "map" && (
                  <GeoMapChart
                    id={props.id}
                    data={getMapValues(props)}
                    isMobile={isMobile}
                    setEchartInstance={setEchartInstance}
                    isFullH={fullH}
                  />
                )}
              </>
            )}
          </div>
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
