import { create } from "zustand";

type TChart = any;

type TLayoutItem = {
    i: `item-${number}`;
    x: number;
    y: number;
    w: number;
    h: number;
};

interface DashboardViewState {
    layout: TLayoutItem[];
    charts: Record<string, TChart>;

    onDataChange: (data: {
        charts: Record<string, TChart>;
        layout: Array<TLayoutItem>;
    }) => void;
}

const useDashboardViewStore = create<DashboardViewState>((set, get) => ({
    layout: [],
    charts: {},
    onDataChange: ({
        charts,
        layout,
    }: {
        charts: Record<string, TChart>;
        layout: Array<TLayoutItem>;
    }) => {
        set({ charts, layout });
    },
}))

export type { TChart, TLayoutItem };
export default useDashboardViewStore;