import type { ChartConfigType, FieldDataType } from "../sharedTypes";
import { generateGradient, hexToHsla } from "./utils";

export const palettes: any = {
  divergente: [
    "#003366",
    "#004D99",
    "#0066CC",
    "#207AD5",
    "#4392E0",
    "#D65C70",
    "#CC334D",
    "#B32D43",
    "#992639",
    "#7A1F2E",
  ],
  divergente_b: [
    "#003366",
    "#004D99",
    "#0066CC",
    "#207AD5",
    "#4392E0",
    "#D48D22",
    "#CC7A00",
    "#B36B00",
    "#995C00",
    "#804D00",
  ],
  categorica: [
    "#0066CC",
    "#CC7A00",
    "#05615E",
    "#992639",
    "#4392E0",
    "#661A26",
    "#09AFA9",
    "#2F475E",
    "#B32D43",
    "#737373",
  ],
  default: [
    "#5470c6",
    "#91cc75",
    "#fac858",
    "#ee6666",
    "#73c0de",
    "#3ba272",
    "#fc8452",
    "#9a60b4",
    "#ea7ccc",
  ],

  monocolore_a: generateGradient(hexToHsla("#0066CC"), 15),
  monocolore_b: generateGradient(hexToHsla("#004080"), 15),
  monocolore_c: generateGradient(hexToHsla("#2F475E"), 15),
  monocolore_d: generateGradient(hexToHsla("#20d8b5"), 15),
  //monocolore: Array(30).fill("#0066CC"),

  _1_a: ["#0066CC"],
  _1_b: ["#004080"],
  _1_c: ["#2F475E"],

  _2_a: ["#0066CC", "#CC7A00"],
  _2_b: ["#0066CC", "#B32D43"],
  _2_c: ["#05615E", "#CC7A00"],
  _2_d: ["#05615E", "#B32D43"],
  _2_e: ["#CC7A00", "#09AFA9"],

  _3_a: ["#0066CC", "#B32D43", "#CC7A00"],
  _3_b: ["#09AFA9", "#4392E0", "#CC7A00"],
  _3_c: ["#2F475E", "#4392E0", "#CC7A00"],

  _4_a: ["#0066CC", "#4392E0", "#CC7A00", "#B32D43"],
  _4_b: ["#2F475E", "#737373", "#B32D43", "#CC7A00"],
  _4_c: ["#2F475E", "#09AFA9", "#4392E0", "#B32D43"],

  _5_a: ["#0066CC", "#4392E0", "#CC7A00", "#B32D43", "#737373"],
  _5_b: ["#05615E", "#09AFA9", "4392E0", "#CC7A00", "#B32D43"],
};

export const fixedSettings = {
  axis: "#768594",
  grids: "#768594",
  backgroundColor: "#F2F7FC",
  text: {
    dark: "#1A1A1A",
    light: "#5C6F82",
    accent: "#0066CC",
  },
};

export const defaultConfig = {
  colors: [...palettes.divergente],
  palette: "divergente",
  direction: "vertical",
  h: 350,
  labeLine: false,
  legend: true,
  legendPosition: "top",
  tooltip: true,
  tooltipFormatter: "number",
  valueFormatter: "",
  totalLabel: "Totale",
  tooltipTrigger: "axis",
  responsive: true,
};

export const sampleData: FieldDataType = {
  config: defaultConfig as any,
  data: null,
  chart: "bar",
  dataSource: {
    categories: [],
    series: [],
  },
};

export const getFields = (availabelPalettes: any, defaultPalette: string) => [
  {
    label: "Line Chart",
    name: "Line Chart",
    type: "label",
    chartType: ["line"],
    layout: "3",
  },
  {
    label: "Show Zoom",
    name: "zoom",
    type: "select",
    options: ["none", "both_axis", "x_axis", "y_axis"],
    required: false,
    chartType: ["line"],
    otherProps: {},
  },
  {
    label: "Smooth lines",
    name: "smooth",
    type: "number",
    options: [],
    required: false,
    chartType: ["line"],
    otherProps: { step: 0.1 },
    layout: "",
  },
  {
    label: "Show Area",
    name: "showArea",
    type: "checkbox",
    options: [],
    required: false,
    chartType: ["line"],
    otherProps: {},
    layout: "",
  },

  {
    label: "Show All Symbol",
    name: "showAllSymbol",
    type: "checkbox",
    options: [],
    required: false,
    chartType: ["line"],
    otherProps: {},
    layout: "",
  },

  {
    label: "Bar Chart",
    name: "Bar Chart",
    type: "label",
    chartType: ["bar"],
    layout: "3",
  },
  {
    label: "Direction",
    name: "direction",
    type: "select",
    options: ["horizontal", "vertical"],
    otherProps: {
      defaultValue: "horizontal",
    },
    required: false,
    chartType: ["bar", "line"],
    layout: "",
  },
  {
    label: "Stack Values",
    name: "stack",
    type: "checkbox",
    options: [],
    required: false,
    chartType: ["bar"],
    otherProps: {},
    layout: "",
  },

  {
    label: "Pie Chart",
    name: "Pie Chart",
    type: "label",
    chartType: ["pie"],
    layout: "3",
  },
  {
    label: "Total Label",
    name: "totalLabel",
    type: "text",
    options: [],
    required: false,
    chartType: ["pie"],
    otherProps: {},
    layout: "",
  },

  {
    label: "Show labels",
    name: "showPieLabels",
    type: "checkbox",
    options: [],
    required: false,
    chartType: ["pie"],
    otherProps: {
      defaultChecked: true,
    },
    layout: "",
  },

  {
    label: "Show Label Line",
    name: "labeLine",
    type: "checkbox",
    options: [],
    required: false,
    chartType: ["pie"],
    otherProps: {},
    layout: "",
    dependsOn: "showPieLabels",
  },

  {
    label: "Map Chart",
    name: "Map Chart",
    type: "label",
    chartType: ["map"],
    layout: "3",
  },
  {
    label: "GeoJson URL",
    name: "geoJsonUrl",
    type: "text",
    options: [],
    required: true,
    chartType: ["map"],
    otherProps: {
      defaultValue: "",
    },
    layout: "2",
  },
  {
    label: "Matching Property Name",
    name: "nameProperty",
    type: "text",
    options: [],
    required: true,
    chartType: ["map"],
    otherProps: {
      defaultValue: "NAME",
    },
    layout: "",
  },
  {
    label: "Show Labels",
    name: "showMapLabels",
    type: "checkbox",
    options: [],
    required: false,
    chartType: ["map"],
    otherProps: {},
    layout: "",
  },
  {
    label: "Serie Name",
    name: "serieName",
    type: "text",
    options: [],
    required: false,
    chartType: ["map"],
    otherProps: {
      defaultValue: "",
    },
    layout: "",
  },
  {
    label: "Area Overlay Color",
    name: "areaColor",
    type: "color",
    options: [],
    required: false,
    chartType: ["map"],
    otherProps: {
      defaultValue: "#F2F7FC",
    },
    layout: "",
  },
  {
    label: "Show VisualMap",
    name: "visualMap",
    type: "checkbox",
    options: [],
    required: false,
    chartType: ["map"],
    otherProps: {},
    layout: "",
  },
  {
    label: "VisualMap Position",
    name: "visualMapLeft",
    type: "select",
    options: ["right", "left"],
    otherProps: {
      defaultValue: "right",
    },
    required: false,
    chartType: ["map"],
    layout: "",
    dependsOn: "visualMap",
  },
  {
    label: "VisualMap Orientation",
    name: "visualMapOrient",
    type: "select",
    options: ["vertical", "horizontal"],
    otherProps: {
      defaultValue: "vertical",
    },
    required: false,
    chartType: ["map"],
    layout: "",
    dependsOn: "visualMap",
  },
  {
    label: "General",
    name: "General",
    type: "label",
    chartType: ["bar", "line", "pie", "map"],
    layout: "3",
  },
  {
    label: "Palette",
    name: "palette",
    type: "select",
    options: availabelPalettes,
    otherProps: {},
    required: false,
    chartType: ["bar", "line", "pie", "map"],
    defaultValue: defaultPalette,
    layout: "2",
  },
  {
    label: "Chart Height",
    name: "h",
    type: "number",
    options: [],
    otherProps: {
      step: 10,
    },
    required: false,
    chartType: ["bar", "line", "pie", "map"],
    layout: "",
  },
  {
    label: "Responsive",
    name: "responsive",
    type: "checkbox",
    options: [],
    required: false,
    chartType: ["bar", "line", "pie"],
    otherProps: { defaultChecked: true },
    layout: "",
  },
  {
    label: "Show Legend",
    name: "legend",
    type: "checkbox",

    options: [],
    required: false,
    chartType: ["bar", "line", "pie"],
    otherProps: { defaultChecked: true },
    layout: "",
  },
  {
    label: "Legend Position",
    name: "legendPosition",
    type: "select",
    options: ["bottom", "top"],
    required: false,
    chartType: ["bar", "line", "pie"],
    otherProps: {
      defaultValue: "bottom",
    },
    layout: "",
    dependsOn: "legend",
  },

  {
    label: "Tooltip",
    name: "Tooltip",
    type: "label",
    chartType: ["bar", "line", "pie", "map"],
    layout: "3",
  },
  {
    label: "Show Tooltip",
    name: "tooltip",
    type: "checkbox",
    options: [],
    required: false,
    chartType: ["bar", "line", "pie", "map"],
    otherProps: { defaultChecked: true },
    layout: "",
  },
  {
    label: "Value Suffix",
    name: "valueFormatter",
    type: "text",
    options: [],
    required: false,
    chartType: ["bar", "line", "pie", "map"],
    otherProps: {},
    layout: "",
    dependsOn: "tooltip",
  },
  {
    label: "Value Format",
    name: "tooltipFormatter",
    type: "select",
    options: ["", "number", "currency", "percentage"],
    required: false,
    chartType: ["bar", "line", "pie", "map"],
    otherProps: {
      defaultValue: "number",
    },
    layout: "",
    dependsOn: "tooltip",
  },
  {
    label: "Tooltip trigger",
    name: "tooltipTrigger",
    type: "select",
    options: ["item", "axis"],
    required: false,
    chartType: ["bar", "line"],
    otherProps: { defaultValue: "axis" },
    layout: "",
  },
  {
    label: "Grid",
    name: "Grid",
    type: "label",
    chartType: ["bar", "line"],
    layout: "3",
  },
  {
    label: "Height",
    name: "gridHeight",
    type: "text",
    options: [],
    otherProps: {
      defaultValue: "auto",
    },
    required: false,
    chartType: ["bar", "line"],
    layout: "",
  },
  {
    label: "Width",
    name: "gridWidth",
    type: "text",
    options: [],
    otherProps: {
      defaultValue: "auto",
    },
    required: false,
    chartType: ["bar", "line"],
    layout: "",
  },
  {
    label: "Left Margin (%/px)",
    name: "gridLeft",
    type: "text",
    options: [],
    otherProps: {
      defaultValue: "10%",
    },
    required: false,
    chartType: ["bar", "line"],
    layout: "",
  },
  {
    label: "Right Margin (%/px)",
    name: "gridRight",
    type: "text",
    options: [],
    otherProps: {
      defaultValue: "10%",
    },
    required: false,
    chartType: ["bar", "line"],
    layout: "",
  },
  {
    label: "Top Margin (%/px)",
    name: "gridTop",
    type: "text",
    options: [],
    otherProps: { defaultValue: 60 },
    required: false,
    chartType: ["bar", "line"],
    layout: "",
  },
  {
    label: "Bottom Margin (%/px)",
    name: "gridBottom",
    type: "text",
    options: [],
    otherProps: { defaultValue: 60 },
    required: false,
    chartType: ["bar", "line"],
    layout: "",
  },

  {
    label: "Axes",
    name: "Axes",
    type: "label",
    chartType: ["bar", "line"],
    layout: "3",
  },
  {
    label: "X axis Label",
    name: "xLabel",
    type: "text",
    options: [],
    otherProps: {},
    required: false,
    chartType: ["bar", "line"],
    layout: "",
  },
  {
    label: "Y axis Label",
    name: "yLabel",
    type: "text",
    options: [],
    otherProps: {},
    required: false,
    chartType: ["bar", "line"],
    layout: "",
  },
  {
    label: "Name Gap",
    name: "nameGap",
    type: "number",
    options: [],
    otherProps: {
      defaultValue: 40,
    },
    required: false,
    chartType: ["bar", "line"],
    layout: "",
  },
];
