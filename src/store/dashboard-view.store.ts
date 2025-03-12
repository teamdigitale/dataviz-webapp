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
    name: string;
    description: string;
    layout: TLayoutItem[];
    charts: Record<string, TChart>;

    onDataChange: (data: {
        name: string;
        description: string;
        charts: Record<string, TChart>;
        layout: Array<TLayoutItem>;
    }) => void;
}

const useDashboardViewStore = create<DashboardViewState>((set, get) => ({
    name: '',
    description: '',
    layout: [],
    charts: {},
    onDataChange: ({
        charts,
        layout,
        name, description
    }: {
        name: string;
        description: string;
        charts: Record<string, TChart>;
        layout: Array<TLayoutItem>;
    }) => {
        set({ charts, layout, name, description });
    },
}))

export type { TChart, TLayoutItem };
export default useDashboardViewStore;