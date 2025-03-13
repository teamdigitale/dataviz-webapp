import { create } from "zustand";
import * as api from "../lib/dashaboard-api";

type TChart = any;

type TLayoutItem = {
    i: `item-${number}`;
    x: number;
    y: number;
    w: number;
    h: number;
};

interface DashboardEditSelectors {
    name: string;
    description: string;
    breakpoint: string;
    layout: TLayoutItem[];
    show: boolean;
    lastCreated?: string;
    selectedChart?: TChart;
    updatedLayout: TLayoutItem[];
    charts: Record<string, TChart>;
    isLoading: boolean;
    error?: {
        message: string
    }
}

interface DashboardEditActions {
    setBreakpoint: (breakpoint: string) => void;
    setSelectedChart: (selectedChart?: TChart) => void;
    setUpdatedLayout: (updatedLayout: TLayoutItem[]) => void;
    addItem: () => void;
    deleteItem: (id: string) => void;
    showAddModal: (i: string) => void;
    closeAddModal: () => void;
    fetchData: (id: string) => void;
    mutate: (id: string) => void;
}

type DashboardEditState = DashboardEditSelectors & DashboardEditActions

const initialState = {
    name: '',
    description: '',
    breakpoint: "lg",
    layout: [],
    show: false,
    lastCreated: undefined,
    selectedChart: undefined,
    updatedLayout: [],
    charts: {},
    isLoading: true,
}

const useDashboardEditStore = create<DashboardEditState>()((set, get) => ({
    name: '',
    description: '',
    breakpoint: "lg",
    layout: [],
    show: false,
    lastCreated: undefined,
    selectedChart: undefined,
    updatedLayout: [],
    charts: {},
    isLoading: true,
    setBreakpoint: (breakpoint) => set({ breakpoint }),
    setSelectedChart: (selectedChart) => set({ selectedChart }),
    setUpdatedLayout: (updatedLayout) => set({ updatedLayout }),
    addItem: () => {
        const { layout } = get();
        const xMax = layout.reduce((acc, cur) => (cur.x > acc ? cur.x : acc), 0);
        const yMax = layout.reduce((acc, cur) => (cur.y > acc ? cur.y : acc), 0);
        const count = layout.length ?? 0;
        const i = `item-${count}`;
        const l = { i, x: xMax, y: yMax, w: 1, h: 1 };
        const newLayout = [...layout, l] as typeof layout;

        set({
            show: true,
            lastCreated: i,
            layout: newLayout,
            updatedLayout: layout,
        });
    },
    deleteItem: (id: string) => {
        console.log("delete", id);
        const { layout, updatedLayout } = get();
        set({
            layout: layout.filter((i) => i.i !== id),
            updatedLayout: updatedLayout.filter((i) => i.i !== id),
        });
    },
    showAddModal: (i: string) => {
        set({ show: true, lastCreated: i });
    },
    closeAddModal: () => {
        const { charts, lastCreated, selectedChart } = get();

        set({
            charts: { ...charts, [lastCreated as string]: selectedChart },
            show: false,
            lastCreated: undefined,
            selectedChart: undefined,
        });
    },
    fetchData: async (id: string) => {
        const data = await api.findById(id)

        if (data) {
            const layout = data.slots.map(
                ({ settings, chart }: { settings: TLayoutItem; chart: TChart }) => ({
                    ...settings,
                    chart,
                })
            );
            const charts = layout.reduce(
                (p: any, c: { i: any; chart: any }) => ({ ...p, [c.i]: c.chart }),
                {}
            );

            const { name, description } = data;

            set({ charts, layout, name, description, isLoading: false });
        }
    },
    mutate: (id: string) => {
        get().fetchData(id)
    }
}));

export type { TChart, TLayoutItem };
export default useDashboardEditStore;