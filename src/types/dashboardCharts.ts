import type { CSSProperties } from "react";
import type { Incident } from "./incident";

export type DashboardChartsProps = {
  incidents: Incident[];
};

export type BarStyle = CSSProperties & {
  "--bar-width": string;
};
