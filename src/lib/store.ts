import { create } from 'zustand';
import { persist, createJSONStorage, devtools } from 'zustand/middleware';

import { defaultConfig } from './constants';
import { MatrixType, FieldDataType } from '../types';

let store = (set: any) => ({
  data: null,
  chart: 'bar',
  config: defaultConfig,
  rawData: null,
  name: '',
  id: null,
  list: [],
  setId: (value: string) => set(() => ({ id: value })),
  setName: (value: string) => set(() => ({ name: value })),
  setConfig: (value: object) => set(() => ({ config: value })),
  setChart: (value: string) => set(() => ({ chart: value })),
  setRawData: (value: any) => set(() => ({ rawData: value })),
  setData: (value: MatrixType | null) => set(() => ({ data: value })),
  load: (value: any) =>
    set(() => ({
      chart: value.chart,
      config: value.config,
      data: value.data,
      name: value.name,
      id: value.id,
    })),
  reset: () =>
    set(() => ({
      data: 0,
      chart: 'bar',
      config: defaultConfig,
      rawData: null,
      name: '',
      id: null,
    })),
  addItem: (item: FieldDataType) =>
    set((state) => ({ list: [...state.list, item] })),
  removeItem: (id: string) => (state) => ({
    list: state.list.filter((i: FieldDataType) => i.id !== id),
  }),
  updateItem: (item: FieldDataType) => (state) => ({
    list: state.list.map((i: FieldDataType) => (i.id === item.id ? item : i)),
  }),
});

// const useStoreState = create(devtools(store, { name: 'chart', trace: false }));
const useStoreState = create(
  persist(
    devtools(store, {
      name: 'ChartStore',
    }),
    {
      name: 'chart-list',
    }
  )
);
export default useStoreState;
