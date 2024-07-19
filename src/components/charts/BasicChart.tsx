import ReactEcharts from "echarts-for-react";
import { FieldDataType } from "../../types";
import { useRef, useEffect } from "react";
import { saveAs } from "file-saver";
import { Button } from "design-react-kit";
import { formatTooltip } from "../../lib/utils";

type ChartPropsType = {
  data: FieldDataType;
  isMobile?: boolean;
};

function BasicChart({ data, isMobile = false }: ChartPropsType, id: string) {
  const refCanvas = useRef<ReactEcharts>();

  function getOptions(data: FieldDataType) {
    const config: any = data.config;
    const responsive: boolean =
      typeof config.responsive === "undefined" ? true : config.responsive;
    let grid = {
      left: isMobile && responsive ? 10 : config.gridLeft || "10%",
      right: config.gridRight || "10%",
      height: config.gridHeight || "auto",
      width: config.gridWidth || "auto",
      bottom: config.gridBottom || 60,
      top: config.gridTop || 60,
    };
    const zoom = config.zoom || "none";
    let dataZoom = [];
    if (zoom !== "none") {
      const x = [
        {
          show: true,
          start: 1,
          end: 100,
          xAxisIndex: [0],
          type: "inside",
        },
        {
          show: true,
          start: 1,
          end: 100,
          xAxisIndex: [0],
          type: "slider",
        },
      ];
      const y = [
        {
          show: true,
          start: 1,
          end: 100,
          yAxisIndex: [0],
          type: "inside",
        },
        {
          show: true,
          start: 1,
          end: 100,
          yAxisIndex: [0],
          type: "slider",
        },
      ];

      if (zoom === "both_axis") {
        dataZoom = [...x, ...y];
      } else if (zoom === "x_axis") {
        dataZoom = [...x];
      } else if (zoom === "y_axis") {
        dataZoom = [...y];
      }
    }

    let dataZoomOpt = ["both_axis", "x_axis", "y_axis"].includes(zoom)
      ? { dataZoom }
      : {};

    let xName = config.xLabel
      ? {
          name: config.xLabel,
          nameLocation: "middle",
          nameGap: config.nameGap,
        }
      : {};
    let yName = config.yLabel
      ? {
          name: config.yLabel,
          nameLocation: "middle",
          nameGap: config.nameGap,
        }
      : {};

    const axis =
      config.direction === "vertical"
        ? {
            xAxis: {
              ...xName,
              type: "category",
              data: data.dataSource.categories,
              axisTick: { show: false },
              axisLabel: {
                hideOverlap: true,
              },
            },
            yAxis: {
              ...yName,
              nameRotate: 90,
              type: "value",
              axisTick: { show: false },
              axisLabel: { show: responsive ? !isMobile : true },
            },
          }
        : {
            yAxis: {
              ...xName,
              nameRotate: 90,
              type: "category",
              data: data.dataSource.categories,
              axisTick: { show: false },
              axisLabel: { show: responsive ? !isMobile : true },
            },
            xAxis: {
              ...yName,
              type: "value",
              axisTick: { show: false },
              axisLabel: {
                hideOverlap: true,
              },
            },
          };

    const tooltip = {
      trigger: config.tooltipTrigger || "item",
      confine: true,
      extraCssText: "z-index:1000;max-width:90%;white-space:pre-wrap;",
      textStyle: {
        overflow: "breakAll",
        width: 150,
      },
      axisPointer: {
        type: "shadow",
        snap: true,
      },
      valueFormatter: (value) => {
        return formatTooltip(value, config);
      },
      show: config.tooltip ?? true,
    };

    let options = {
      backgroundColor: config.background ? config.background : "#F2F7FC",
      color: config.colors || [
        "#5470c6",
        "#91cc75",
        "#fac858",
        "#ee6666",
        "#73c0de",
        "#3ba272",
        "#fc8452",
        "#9a60b4",
        "#ea7ccc",
      ],
      ...axis,
      grid,
      series: data.dataSource.series.map((serie) => {
        let rest = {};
        if (serie.type === "bar" && config.stack) {
          let stack: any = config.stack
            ? config.direction === "vertical"
              ? "x"
              : "y"
            : false;

          rest = {
            ...rest,
            stack,
            itemStyle: { borderColor: "white", borderWidth: 0.25 },
          };
        }
        if (serie.type === "line") {
          if (config.smooth) {
            let smooth: any = config.smooth ? parseFloat(config.smooth) : false;
            rest = { ...rest, smooth };
          }
          if (config.showArea) {
            const area = { areaStyle: {} };
            rest = { ...rest, ...area };
          }
          if (config.showAllSymbol) {
            const symbols = { showAllSymbol: true || "auto" };
            rest = { ...rest, ...symbols };
          }
        }
        return {
          ...serie,
          ...rest,
        };
      }),
      textStyle: {
        fontFamily: "Titillium Web",
        fontSize: 14,
      },
      tooltip,
      legend: {
        type: "scroll",
        left: "center",
        top: config?.legendPosition || "bottom",
        show: config.legend ?? true,
      },
      ...dataZoomOpt,
    };
    return options;
  }

  useEffect(() => {
    if (data && refCanvas.current) {
      const options: any = getOptions(data);
      refCanvas.current?.getEchartsInstance().setOption(options);
    }
  }, [data, refCanvas]);

  async function downLoadImage(element: any, id: string) {
    const echartInstance = element.getEchartsInstance();
    const base64DataUrl = echartInstance.getDataURL();
    try {
      const blob = await fetch(base64DataUrl).then((res) => res.blob());
      saveAs(blob, `chart-${"" + Date.now()}.png`);
    } catch (error) {
      console.log("error", error);
    }
  }

  const config: any = data.config || null;
  const height = config?.h || 500;
  return (
    <div style={{ textAlign: "left" }}>
      <ReactEcharts
        option={{}}
        ref={refCanvas}
        style={{
          width: "100%",
          height: height,
          maxWidth: "100%",
          marginBottom: "30px",
        }}
      />
      <Button
        type="submit"
        size="xs"
        onClick={() => downLoadImage(refCanvas.current, id)}
      >
        Download
      </Button>
    </div>
  );
}

export default BasicChart;
