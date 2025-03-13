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
    setLayout: (layout: TLayoutItem[]) => void;
    setSelectedChart: (selectedChart?: TChart) => void;
    setUpdatedLayout: (updatedLayout: TLayoutItem[]) => void;
    setCharts: (charts: Record<string, TChart>) => void;
    addItem: () => void;
    deleteItem: (id: string) => void;
    showAddModal: (i: string) => void;
    closeAddModal: () => void;
    onDataChange: (data: {
        name: string;
        description: string;
        charts: Record<string, TChart>;
        layout: Array<TLayoutItem>;
    }) => void;
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
    setLayout: (layout) => set({ layout }),
    setSelectedChart: (selectedChart) => set({ selectedChart }),
    setUpdatedLayout: (updatedLayout) => set({ updatedLayout }),
    setCharts: (charts) => set({ charts }),

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
    onDataChange: ({
        charts,
        layout,
        name,
        description
    }: {
        charts: Record<string, TChart>;
        layout: Array<TLayoutItem>;
        name: string;
        description: string
    }) => {
        set({ charts, layout, name, description });
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

            get().onDataChange({ charts, layout, name, description });
            set({ isLoading: false })
        }
    },
    mutate: (id: string) => {
        get().fetchData(id)
    }
}));

export type { TChart, TLayoutItem };
export default useDashboardEditStore;