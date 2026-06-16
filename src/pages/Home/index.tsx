import { useMemo } from "react";
import { DashboardCharts, IssueList, IssueSummary } from "@/components";
import { useIncidentStore } from "@/store";
import type { Incident } from "@/types";
import styles from "./styles.module.scss";

const isOverdue = (incident: Incident) => {
  if (!incident.dueDate || incident.status === "closed") return false;
  return new Date(incident.dueDate).getTime() < Date.now();
};

const getLatestIncidents = (items: Incident[]) => {
  return [...items]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, 10);
};

export const Home = () => {
  const incidents = useIncidentStore((state) => state.incidents);
  const summary = useMemo(
    () => ({
      total: incidents.length,
      open: incidents.filter((incident) => incident.status === "open").length,
      highPriority: incidents.filter((incident) => incident.priority === "high")
        .length,
      overdue: incidents.filter(isOverdue).length,
    }),
    [incidents],
  );

  const latestIncidents = useMemo(
    () => getLatestIncidents(incidents),
    [incidents],
  );

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>Dashboard de obra</p>
          <h1>Seguimiento de incidencias</h1>
          <p>
            Priorizacion operativa por criticidad, responsable y fecha de
            vencimiento.
          </p>
        </div>
      </header>

      <IssueSummary {...summary} />
      <DashboardCharts incidents={incidents} />

      <section className={styles.latest}>
        <div>
          <p className={styles.eyebrow}>Actividad reciente</p>
          <h2>Ultimas 10 incidencias</h2>
        </div>

        <IssueList incidents={latestIncidents} showPaginationInfo={false} />
      </section>
    </div>
  );
};
