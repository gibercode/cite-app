export type Trend = "up" | "down" | "neutral";

export type StatCardProps = {
  title: string;
  value: string | number;
  trend?: Trend;
  trendLabel?: string;
};
