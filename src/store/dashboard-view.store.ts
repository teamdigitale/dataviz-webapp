import { create } from "zustand";
import * as api from "../lib/dashaboard-api";
import { DashboardDetail } from "../lib/dashaboard-api";

type TChartRef = { id: string };

type TLayoutItem = {
    i: `item-${number}`;
    x: number;
    y: number;
    w: number;
    h: number;
};

interface DashboardViewActions {
    load: (id: string) => void;
}

interface DashboardViewSelectors {
    id?: string;
    name: string;
    description: string;
    layout: TLayoutItem[];
    charts: Record<string, TChartRef>;
    isLoading: boolean;
    loaded: boolean;
    error?: {
        message: string;
    }
}

type DashboardViewState = DashboardViewActions & DashboardViewSelectors;

const useDashboardViewStore = create<DashboardViewState>((set, get) => ({
    name: '',
    description: '',
    isLoading: true,
    loaded: false,
    layout: [],
    charts: {},
    load: async (id: string) => {
        try {
            const data = await api.findById(id) as DashboardDetail;

            if (data) {
                const layout = data
                    .slots
                    .map(
                        ({ settings }: { settings: TLayoutItem; }) => ({
                            ...settings,
                            static: true,
                            resizeHandlers: undefined
                        })
                    );

                const charts = data
                    .slots
                    .reduce<Record<string, TChartRef>>((p, c) => ({ ...p, [c.settings.i]: c.chart }), {});

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

        } catch (error) {
            set({ error: { message: (error as Error).message }, isLoading: false })
        }
    }
}))

export type { TChartRef as TChart, TLayoutItem };
export default useDashboardViewStore;