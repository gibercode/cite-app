import { StatCard } from "@/components/StatCard";
import type { IssueSummaryProps } from "@/types";
import styles from "./styles.module.scss";

export const IssueSummary = ({
  total,
  open,
  highPriority,
  overdue,
}: IssueSummaryProps) => {
  return (
    <section className={styles.grid} aria-label="Resumen de incidencias">
      <StatCard
        title="Total incidencias"
        value={total}
        trendLabel="Base actual"
      />
      <StatCard
        title="Abiertas"
        value={open}
        trend={open > 0 ? "up" : "neutral"}
        trendLabel="Requieren gestión"
      />
      <StatCard
        title="Alta prioridad"
        value={highPriority}
        trend={highPriority > 0 ? "up" : "neutral"}
        trendLabel="Atención inmediata"
      />
      <StatCard
        title="Vencidas"
        value={overdue}
        trend={overdue > 0 ? "down" : "neutral"}
        trendLabel="Con fecha superada"
      />
    </section>
  );
};
