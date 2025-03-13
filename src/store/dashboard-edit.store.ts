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
    id?: string;
    name: string;
    description: string;
    breakpoint: string;
    layout: TLayoutItem[];
    show: boolean;
    lastCreated?: string;
    selectedChart?: TChart;
    charts: Record<string, TChart>;
    loaded: boolean;
    isLoading: boolean;
    error?: {
        message: string
    }
}

interface DashboardEditActions {
    setBreakpoint: (breakpoint: string) => void;
    setSelectedChart: (selectedChart?: TChart) => void;
    setLayout: (layout: TLayoutItem[]) => void;
    addItem: () => void;
    deleteItem: (id: string) => void;
    showAddModal: (i: string) => void;
    closeAddModal: () => void;
    load: (id: string) => void;
    reload: () => void;
    save: () => Promise<boolean>;
}

type DashboardEditState = DashboardEditSelectors & DashboardEditActions

const useDashboardEditStore = create<DashboardEditState>()((set, get) => ({
    name: '',
    description: '',
    breakpoint: "lg",
    layout: [],
    show: false,
    lastCreated: undefined,
    selectedChart: undefined,
    charts: {},
    isLoading: true,
    loaded: false,
    setBreakpoint: (breakpoint) => set({ breakpoint }),
    setSelectedChart: (selectedChart) => set({ selectedChart }),
    setLayout: (layout) => set({ layout }),
    addItem: () => {
        const { layout } = get();
        const xMax = 0
        const yMax = layout.reduce((acc, cur) => (cur.y > acc ? cur.y : acc), 0);
        const count = layout.length ?? 0;
        const i = `item-${count}`;
        const l = { i, x: xMax, y: yMax, w: 4, h: 1 };
        const newLayout = [...layout, l] as typeof layout;

        set({
            show: true,
            lastCreated: i,
            layout: newLayout,
        });
    },
    deleteItem: (id: string) => {
        console.log("delete", id);
        const { layout } = get();
        set({
            layout: layout.filter((i) => i.i !== id),
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
    load: async (id: string) => {
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

            set({
                charts,
                layout,
                name,
                description,
                isLoading: false,
                loaded: true,
                id,
            });
        }
    },
    reload: async () => {
        const { id, load } = get()
        if (id) {
            await load(id)
        }
    },
    save: async () => {
        const { layout, charts, id } = get()
        const body = {
            slots: layout.map((l) => ({
                chartId: charts[l.i]?.id,
                settings: { i: l.i, w: l.w, h: l.h, x: l.x, y: l.y },
            })),
        };

        return await api.updateSlots(id!, body).then(r => Boolean(r));
    }
}));

export type { TChart, TLayoutItem };
export default useDashboardEditStore;