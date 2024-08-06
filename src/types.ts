export type MatrixType = [[string | number]];

export type SerieType = {
  name: string;
  data: number[];
  type: string;
};

export type FieldDataType = {
  config: ChartConfigType;
  dataSource: any;
  chart: string;
  data: MatrixType;
  name?: string;
  id?: string;
};

export type Step = {
  name: string;
  id: string;
  index: number;
};

export type ChartPropsType = {
  id?: string;
  data: FieldDataType;
  isMobile?: boolean;
  setEchartInstance: (i: any) => void;
};

export type ChartConfigType = {
  colors: [] | string[];
  direction: string;
  h: number;
  labeLine: boolean;
  legend: boolean;
  legendPosition: string;
  palette: string;
  tooltip: boolean;
  tooltipFormatter: string;
  valueFormatter: string;
  totalLabel: string;
  tooltipTrigger: string;
  xLabel?: string;
  yLabel?: string;
  responsive?: boolean;
  zoom?: string;
  geoJsonUrl?: string;
  stack?: boolean;
  gridLeft?: string | number;
  gridRight?: string | number;
  gridTop?: string | number;
  gridBottom?: string | number;
  gridHeight?: string | number;
  gridWidth?: string | number;
  visualMap?: boolean;
  visualMapLeft?: string;
  visualMapOrient?: string;
  background?: string;
  smooth?: boolean;
  showArea?: boolean;
  showAllSymbol?: boolean;
  showPieLabels?: boolean;
  serieName?: string;
  showMapLabels?: boolean;
  areaColor?: string;
  nameProperty?: string;
};
