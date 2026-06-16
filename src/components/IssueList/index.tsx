import { useCallback, useEffect, useRef, useState } from "react";
import { priorityLabel, statusLabel } from "@/constants";
import type { Incident } from "@/types";
import { formatDate } from "@/utils";
import styles from "./styles.module.scss";

const PAGE_SIZE = 10;

type IssueListProps = {
  incidents: Incident[];
  showPaginationInfo?: boolean;
};

export const IssueList = ({
  incidents,
  showPaginationInfo = true,
}: IssueListProps) => {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  const visibleIncidents = incidents.slice(0, visibleCount);
  const hasMore = visibleCount < incidents.length;

  const loadMore = useCallback(() => {
    setVisibleCount((currentCount) =>
      Math.min(currentCount + PAGE_SIZE, incidents.length),
    );
  }, [incidents.length]);

  useEffect(() => {
    const loader = loaderRef.current;
    if (!loader || !hasMore) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) loadMore();
      },
      { rootMargin: "160px" },
    );

    observer.observe(loader);

    return () => observer.disconnect();
  }, [hasMore, loadMore, visibleCount]);

  if (!incidents.length) {
    return (
      <div className={styles.empty}>
        No hay incidencias que coincidan con los filtros seleccionados.
      </div>
    );
  }

  return (
    <section className={styles.list} aria-label="Listado de incidencias">
      {visibleIncidents.map((incident) => (
        <article className={styles.item} key={incident.id}>
          <div className={styles.header}>
            <div>
              <div className={styles.meta}>
                <span>#{incident.sequenceId}</span>
                <span>{incident.type.name}</span>
                <span>{incident.locationDescription}</span>
              </div>
              <h3>{incident.title}</h3>
            </div>

            <div className={styles.badges}>
              <span
                className={`${styles.priority} ${styles[incident.priority]}`}
              >
                {priorityLabel[incident.priority]}
              </span>
              <span className={`${styles.status} ${styles[incident.status]}`}>
                {statusLabel[incident.status]}
              </span>
            </div>
          </div>

          <p className={styles.description}>{incident.description}</p>

          <div className={styles.footer}>
            <div className={styles.people}>
              {incident.assignees.slice(0, 3).map((assignee) => (
                <img
                  key={assignee.id}
                  src={assignee.avatarUrl}
                  alt={assignee.name}
                  title={assignee.name}
                />
              ))}
              <span>
                {incident.assignees.map((user) => user.name).join(", ")}
              </span>
            </div>

            <div className={styles.dates}>
              <span>Vence: {formatDate(incident.dueDate)}</span>
              <span>Creada: {formatDate(incident.createdAt)}</span>
            </div>
          </div>
        </article>
      ))}

      {(showPaginationInfo || hasMore) && (
        <div className={styles.pagination} ref={loaderRef}>
          {showPaginationInfo && (
            <span>
              Mostrando {visibleIncidents.length} de {incidents.length}
            </span>
          )}

          {hasMore && (
            <button type="button" onClick={loadMore}>
              Cargar 10 mas
            </button>
          )}
        </div>
      )}
    </section>
  );
};
