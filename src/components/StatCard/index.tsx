import type { StatCardProps, Trend } from "@/types";
import styles from "./styles.module.scss";

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
