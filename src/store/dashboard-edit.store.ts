import { create } from "zustand";

type TChart = any;

type TLayoutItem = {
    i: `item-${number}`;
    x: number;
    y: number;
    w: number;
    h: number;
};


interface DashboardEditState {
    breakpoint: string;
    layout: TLayoutItem[];
    show: boolean;
    lastCreated?: string;
    selectedChart?: TChart;
    updatedLayout: TLayoutItem[];
    charts: Record<string, TChart>;
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
        charts: Record<string, TChart>;
        layout: Array<TLayoutItem>;
    }) => void;
}

const useDashboardEditStore = create<DashboardEditState>((set, get) => ({
    breakpoint: "lg",
    layout: [],
    show: false,
    lastCreated: undefined,
    selectedChart: undefined,
    updatedLayout: [],
    charts: {},

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
    }: {
        charts: Record<string, TChart>;
        layout: Array<TLayoutItem>;
    }) => {
        set({ charts, layout });
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
}));

export type { TChart, TLayoutItem };
export default useDashboardEditStore;