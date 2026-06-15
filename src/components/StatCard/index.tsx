import styles from "./styles.module.scss";

type Trend = "up" | "down" | "neutral";

interface StatCardProps {
  title: string;
  value: string | number;
  trend?: Trend;
  trendLabel?: string;
}

const TrendArrow = ({ trend }: { trend: Trend }) => {
  if (trend === "up") return <span className={styles.arrowUp}>↗</span>;
  if (trend === "down") return <span className={styles.arrowDown}>↘</span>;
  return null;
};

export const StatCard = ({
  title,
  value,
  trend = "neutral",
  trendLabel,
}: StatCardProps) => {
  return (
    <article className={styles.card} aria-label={title}>
      <p className={styles.title}>{title}</p>

      <p className={styles.value}>{value}</p>

      {trendLabel && (
        <p className={`${styles.trend} ${styles[trend]}`}>
          <TrendArrow trend={trend} />
          {trendLabel}
        </p>
      )}
    </article>
  );
};
