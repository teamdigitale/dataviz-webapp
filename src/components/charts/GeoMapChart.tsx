import ReactEcharts from "echarts-for-react";
import { useRef, useEffect, useState } from "react";
import { formatTooltip } from "../../lib/utils";
import { ChartPropsType, FieldDataType } from "../../sharedTypes";
import ChartOptions from "../ChartOptions";
import { ErrorBoundary } from "react-error-boundary";
import * as echarts from "echarts";

function GeoMapChart({
  data,
  id,
  setEchartInstance,
  isMobile = false,
  isFullH = false,
}: ChartPropsType) {
  const refCanvas = useRef(null);
  const [error, setError] = useState("");
  const [geoData, setGeoData] = useState(null);
  const [options, setOptions] = useState(null);
  const [weDoNotHaveInstance, setWeDoNotHaveInstance] = useState(true);

  function getOptions(data: FieldDataType, geoData: any) {
    echarts.registerMap(id as string, geoData);
    const config = data.config;

    const tooltip = {
      trigger: "item",
      // valueFormatter: (value) => {
      //   return formatTooltip(value, config);
      // },
      show: config.tooltip ?? true,
      formatter: (params: any) => {
        const value = params.value;
        const name = params.name;
        const serieName = params.seriesName;
        const formattedValue = formatTooltip(value, config);
        if (serieName) {
          return `${serieName}<br/>${name} <strong>${formattedValue}</strong>`;
        }
        return `${name} <strong>${formattedValue}</strong>`;
      },
    };

    const min = Math.min(
      ...data.dataSource.series[0].data.map((d: any) => d.value)
    );
    const max = Math.max(
      ...data.dataSource.series[0].data.map((d: any) => d.value)
    );

    const options = {
      backgroundColor: config.background ? config.background : "#F2F7FC",
      color: config.colors,
      textStyle: {
        fontFamily: "Titillium Web, sans-serif",
        fontSize: 12,
      },
      tooltip,
      visualMap: {
        left: config.visualMapLeft ?? "right",
        orient: config.visualMapOrient ?? "vertical",
        min,
        max,
        text: [
          `${formatTooltip(max, config)} `,
          `${formatTooltip(min, config)} `,
        ],
        backgroundColor: "rgba(255,255,255,1)",
        inverse: config.visualMapOrient === "vertical",
        textStyle: {
          fontSize: 11,
          lineHeight: 0,
          overflow: "truncate",
        },
        padding: 15,
        calculable: false,
        inRange: {
          color: config.colors,
        },
        show: config.visualMap || false,
      },
      series: data.dataSource.series.map((serie: any) => {
        let otherConfig = {};
        if (config.serieName) {
          otherConfig = {
            name: config.serieName,
          };
        }
        return {
          ...serie,
          ...otherConfig,
          label: {
            show: config.showMapLabels ? true : false,
            color: "inherit",
          },
          zoom: 1.2,
          roam: true,
          select: { disabled: true },
          emphasis: {
            label: {
              show: config.showMapLabels,
              color: "inherit",
            },
            itemStyle: {
              areaColor: config.areaColor || "#F2F7FC",
            },
          },
          map: id,
          nameProperty: config.nameProperty ? config.nameProperty : "NAME",
        };
      }),
    };
    return options;
  }

  async function getGeoData() {
    const config = data.config;
    const url = config?.geoJsonUrl || "";
    if (url) {
      try {
        const response = await fetch(url);
        const raw = await response.json();
        setGeoData(raw);
      } catch (error) {
        console.log(error);
        setError("Errore recupero dati GEO JSON");
      }
    }
  }

  useEffect(() => {
    if (data) {
      getGeoData();
    }
  }, [data]);

  useEffect(() => {
    if (geoData) {
      const options: any = getOptions(data, geoData);
      setOptions(options);
    }
  }, [geoData]);

  useEffect(() => {
    if (refCanvas?.current && weDoNotHaveInstance) {
      const echartInstance = (refCanvas.current as any).getEchartsInstance();
      setEchartInstance(echartInstance);
      setWeDoNotHaveInstance(false);
    }
  }, [refCanvas.current, weDoNotHaveInstance]);

  const chartHeight = data.config?.h || "500px";

  return (
    <ErrorBoundary fallback={<div>Errore nel rendering della mappa</div>}>
      <div key={id} id={"chart_" + id}>
        {error && <div className='alert error'>{error}</div>}
        {!geoData && <div>In attesa dei dati geo...</div>}
        {!options ? (
          <div>Loading...</div>
        ) : (
          <ReactEcharts
            option={options}
            ref={refCanvas}
            style={{
              height: isFullH ? "100%" : chartHeight,
              minHeight: isFullH ? "100%" : chartHeight,
              maxHeight: "100%",

              width: "100%",
              maxWidth: "100%",
            }}
          />
        )}
      </div>
    </ErrorBoundary>
  );
}

export default GeoMapChart;
