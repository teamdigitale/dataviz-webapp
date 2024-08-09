import ReactEcharts from 'echarts-for-react';
import { useRef, useEffect, useState } from 'react';
import * as echarts from 'echarts';
import { formatTooltip } from '../../lib/utils';
import { ChartPropsType, FieldDataType } from '../../types';

function GeoMapChart({
  data,
  id,
  setEchartInstance,
  isMobile = false,
}: ChartPropsType) {
  const refCanvas = useRef(null);
  const [geoData, setGeoData] = useState(null);
  const [weDoNotHaveInstance, setWeDoNotHaveInstance] = useState(true);

  function getOptions(data: FieldDataType, geoData: any) {
    echarts.registerMap(id as string, geoData);
    const config = data.config;

    const tooltip = {
      trigger: 'item',
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
      backgroundColor: config.background ? config.background : '#F2F7FC',
      color: config.colors,
      textStyle: {
        fontFamily: 'Titillium Web, sans-serif',
        fontSize: 12,
      },
      tooltip,
      visualMap: {
        left: config.visualMapLeft ?? 'right',
        orient: config.visualMapOrient ?? 'vertical',
        min,
        max,
        text: [
          `${formatTooltip(max, config)} `,
          `${formatTooltip(min, config)} `,
        ],
        backgroundColor: 'rgba(255,255,255,1)',
        inverse: config.visualMapOrient === 'vertical',
        textStyle: {
          fontSize: 11,
          lineHeight: 0,
          overflow: 'truncate',
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
            color: 'inherit',
          },
          zoom: 1.2,
          roam: true,
          select: { disabled: true },
          emphasis: {
            label: {
              show: config.showMapLabels,
              color: 'inherit',
            },
            itemStyle: {
              areaColor: config.areaColor || '#F2F7FC',
            },
          },
          map: id,
          nameProperty: config.nameProperty ? config.nameProperty : 'NAME',
        };
      }),
    };
    return options;
  }

  async function getGeoData() {
    if (data) {
      const config = data.config;
      const url = config?.geoJsonUrl || '';
      if (url) {
        try {
          const response = await fetch(url);
          const raw = await response.json();
          setGeoData(raw);
        } catch (error) {
          console.log(error);
          setGeoData(null);
        }
      }
    }
  }

  useEffect(() => {
    getGeoData();
  }, [data]);

  useEffect(() => {
    if (refCanvas.current && weDoNotHaveInstance) {
      const echartInstance = (refCanvas.current as any).getEchartsInstance();
      setEchartInstance(echartInstance);
      setWeDoNotHaveInstance(false);
    }
  });

  const chartHeight = data.config?.h || '500px';
  const options = data && geoData ? getOptions(data, geoData) : null;
  return (
    <div key={id} id={'chart_' + id}>
      {!data && <div>Loading...</div>}
      {!geoData && <div>In attesa dei dati geo...</div>}
      {options && (
        <ReactEcharts
          option={options}
          ref={refCanvas}
          style={{
            width: '100%',
            height: chartHeight,
            maxWidth: '100%',
          }}
        />
      )}
    </div>
  );
}

export default GeoMapChart;
