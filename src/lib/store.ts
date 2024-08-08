import { create } from 'zustand';
import { persist, createJSONStorage, devtools } from 'zustand/middleware';

import { defaultConfig } from './constants';
import { MatrixType, FieldDataType, StoreStateType } from '../types';

const useStoreState = create<StoreStateType>()(
  devtools(
    persist(
      (set) => ({
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
            rawData: null,
            data: value.data,
            name: value.name,
            id: value.id,
          })),
        reset: () =>
          set(() => ({
            data: null,
            chart: 'bar',
            config: defaultConfig,
            rawData: null,
            name: '',
            id: null,
          })),
        addItem: (item: FieldDataType) =>
          set((state: any) => ({ list: [...state.list, item] })),
        removeItem: (id: string) => (state: any) => ({
          list: state.list.filter((i: FieldDataType) => i.id !== id),
        }),
        updateItem: (item: FieldDataType) => (state: any) => ({
          list: [
            ...state.list.filter((i: FieldDataType) => i.id !== item.id),
            item,
          ],
        }),
      }),
      { name: 'ChartsStore' }
    )
  )
);
export default useStoreState;
