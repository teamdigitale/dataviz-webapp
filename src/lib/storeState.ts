import { create } from "zustand";
import { persist } from "zustand/middleware";
import { defaultConfig } from "./constants";
import { MatrixType, StoreStateType } from "../sharedTypes";
// import { immer } from 'zustand/middleware/immer';

const useStoreState = create<StoreStateType>()(
  // persist(
  (set) => ({
    data: null,
    chart: "bar",
    config: defaultConfig,
    rawData: null,
    description: "",
    publish: false,
    name: "",
    id: null,
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
        description: value.description,
        publish: value.publish,
        name: value.name,
        id: value.id,
      })),
    resetItem: () =>
      set(() => ({
        id: null,
        name: "",
        description: "",
        chart: "bar",
        data: null,
        config: defaultConfig,
        rawData: null,
        publish: true,
      })),
  })
  // { name: "persistedStore" }
  // )
);
export default useStoreState;
