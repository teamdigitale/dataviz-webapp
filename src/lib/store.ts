import { create } from "zustand";
import { persist } from "zustand/middleware";
// import { immer } from 'zustand/middleware/immer';
import { defaultConfig } from "./constants";
import { MatrixType, FieldDataType, StoreStateType } from "../types";

const useStoreState = create<StoreStateType>()(
  persist(
    (set) => ({
      data: null,
      chart: "bar",
      config: defaultConfig,
      rawData: null,
      name: "",
      id: null,
      list: [],
      setId: (value: string) => set(() => ({ id: value })),
      setName: (value: string) => set(() => ({ name: value })),
      setConfig: (value: object) => set(() => ({ config: value })),
      setChart: (value: string) => set(() => ({ chart: value })),
      setRawData: (value: any) => set(() => ({ rawData: value })),
      setData: (value: MatrixType | null) => set(() => ({ data: value })),
      loadItem: (value: any) =>
        set((state) => ({
          chart: value.chart,
          config: value.config,
          rawData: null,
          data: value.data,
          name: value.name,
          id: value.id,
          // list: state.list.filter((i: FieldDataType) => i.id !== value.id),
        })),
      resetItem: () =>
        set(() => ({
          data: null,
          chart: "bar",
          config: defaultConfig,
          rawData: null,
          name: "",
          id: null,
        })),
      addItem: (item: FieldDataType) => {
        set((state) => ({ list: [...state.list, item] }));
      },
      removeItem: (id: string) => {
        set((state) => ({
          list: state.list.filter((i) => i.id !== id),
        }));
      },
      updateItem: (newItem: FieldDataType) =>
        set((state) => ({
          list: state.list.map((i) => {
            if (i.id === newItem.id) {
              return newItem;
            }
            return i;
          }),
        })),
      setList: (items: FieldDataType[]) => {
        set((state) => ({ list: [...items] }));
      },
    }),
    { name: "ChartsStore" }
  )
);
export default useStoreState;
