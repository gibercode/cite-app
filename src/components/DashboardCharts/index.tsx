import { useMemo } from "react";
import type { CSSProperties } from "react";
import {
  priorityLabel,
  priorityOrder,
  statusLabel,
  statusOrder,
} from "@/constants";
import type { BarStyle, DashboardChartsProps } from "@/types";
import { getPercent } from "@/utils";
import styles from "./styles.module.scss";

export const DashboardCharts = ({ incidents }: DashboardChartsProps) => {
  const total = incidents.length;

  const statusCounts = useMemo(() => {
    const statusItems = statusOrder.map((status) => ({
      key: status,
      label: statusLabel[status],
      value: incidents.filter((incident) => incident.status === status).length,
    }));

    return statusItems;
  }, [incidents]);

  const priorityCounts = useMemo(() => {
    return priorityOrder.map((priority) => ({
      key: priority,
      label: priorityLabel[priority],
      value: incidents.filter((incident) => incident.priority === priority)
        .length,
    }));
  }, [incidents]);

  const maxPriorityCount = useMemo(() => {
    return Math.max(...priorityCounts.map((priority) => priority.value), 1);
  }, [priorityCounts]);

  const categoryCounts = useMemo(() => {
    return Array.from(
      incidents.reduce((categoryMap, incident) => {
        categoryMap.set(
          incident.type.name,
          (categoryMap.get(incident.type.name) ?? 0) + 1,
        );

        return categoryMap;
      }, new Map<string, number>()),
    )
      .map(([label, value]) => ({ label, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);
  }, [incidents]);

  const maxCategoryCount = useMemo(() => {
    return Math.max(...categoryCounts.map((category) => category.value), 1);
  }, [categoryCounts]);

  const openPercent = useMemo(
    () => getPercent(statusCounts[0].value, total),
    [statusCounts, total],
  );
  const pausePercent = useMemo(
    () => getPercent(statusCounts[1].value, total),
    [statusCounts, total],
  );

  const donutStyle = {
    "--open-percent": `${openPercent}%`,
    "--pause-percent": `${openPercent + pausePercent}%`,
  } as CSSProperties;

  return (
    <section className={styles.charts} aria-label="Indicadores graficos">
      <article className={styles.panel}>
        <div>
          <p className={styles.eyebrow}>Estado</p>
          <h2>Distribucion operativa</h2>
        </div>

        <div className={styles.statusLayout}>
          <div className={styles.donut} style={donutStyle}>
            <span>{total}</span>
            <small>Total</small>
          </div>

          <div className={styles.legend}>
            {statusCounts.map((status) => (
              <div className={styles.legendItem} key={status.key}>
                <span className={`${styles.dot} ${styles[status.key]}`} />
                <span>{status.label}</span>
                <strong>{status.value}</strong>
              </div>
            ))}
          </div>
        </div>
      </article>

      <article className={styles.panel}>
        <div>
          <p className={styles.eyebrow}>Prioridad</p>
          <h2>Carga por criticidad</h2>
        </div>

        <div className={styles.priorityBars}>
          {priorityCounts.map((priority) => (
            <div className={styles.priorityItem} key={priority.key}>
              <span>{priority.label}</span>
              <div className={styles.track}>
                <div
                  className={`${styles.bar} ${styles[priority.key]}`}
                  style={
                    {
                      "--bar-width": `${Math.max(
                        (priority.value / maxPriorityCount) * 100,
                        priority.value ? 8 : 0,
                      )}%`,
                    } as BarStyle
                  }
                />
              </div>
              <strong>{priority.value}</strong>
            </div>
          ))}
        </div>
      </article>

      <article className={styles.panel}>
        <div>
          <p className={styles.eyebrow}>Categorias</p>
          <h2>Frentes con mas incidencias</h2>
        </div>

        <div className={styles.categoryBars}>
          {categoryCounts.map((category) => (
            <div className={styles.categoryItem} key={category.label}>
              <div className={styles.categoryHeader}>
                <span>{category.label}</span>
                <strong>{category.value}</strong>
              </div>
              <div className={styles.track}>
                <div
                  className={`${styles.bar} ${styles.categoryBar}`}
                  style={
                    {
                      "--bar-width": `${Math.max(
                        (category.value / maxCategoryCount) * 100,
                        8,
                      )}%`,
                    } as BarStyle
                  }
                />
              </div>
            </div>
          ))}
        </div>
      </article>
    </section>
  );
};
