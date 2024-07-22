export type MatrixType = [[string | number]];

export type SerieType = {
  name: string;
  data: number[];
  type: string;
};

export type FieldDataType = {
  config: object;
  dataSource: any;
  chart: string;
  data: MatrixType;
};


export type Step = {
  name: string;
  id: string;
  index: number;
};
