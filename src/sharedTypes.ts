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
  data: MatrixType | null;
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
  palette: string[];
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

export interface StoreStateType {
  data: MatrixType | null;
  chart: string;
  config: any;
  rawData: MatrixType | null;
  name: null | string;
  id: null | string;
  list: [] | FieldDataType[];
  setId: (value: string) => void;
  setName: (value: string) => void;
  setConfig: (value: object) => void;
  setChart: (value: string) => void;
  setRawData: (value: any) => void;
  setData: (value: MatrixType | null) => void;
  loadItem: (value: any) => void;
  resetItem: () => void;
  addItem: (item: FieldDataType) => void;
  removeItem: (id: string) => void;
  updateItem: (item: FieldDataType) => void;
}

export interface RemoteStoreStateType {
  list: [] | FieldDataType[];
  addItem: (item: FieldDataType) => void;
  removeItem: (id: string) => void;
  updateItem: (item: FieldDataType) => void;
  setList: (items: FieldDataType[]) => void;
}
