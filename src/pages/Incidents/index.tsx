import { useMemo } from "react";
import { IssueFilters, IssueList } from "@/components";
import dummyData from "@/assets/dummy-data.json";
import { priorityWeight } from "@/constants";
import { useIncidentFiltersStore } from "@/store";
import type { Incident, Person } from "@/types";
import styles from "./styles.module.scss";

const incidents = dummyData as Incident[];

const getDueTime = (incident: Incident) => {
  if (!incident.dueDate) return Number.POSITIVE_INFINITY;

  return new Date(incident.dueDate).getTime();
};

const sortIncidents = (items: Incident[]) => {
  return [...items].sort((a, b) => {
    const priorityDiff =
      priorityWeight[b.priority] - priorityWeight[a.priority];
    if (priorityDiff !== 0) return priorityDiff;

    const dueDiff = getDueTime(a) - getDueTime(b);
    if (dueDiff !== 0) return dueDiff;

    return a.order - b.order;
  });
};

const getAssignees = (items: Incident[]) => {
  const assigneeMap = new Map<string, Person>();

  items.forEach((incident) => {
    incident.assignees.forEach((assignee) => {
      assigneeMap.set(assignee.id, assignee);
    });
  });

  return Array.from(assigneeMap.values()).sort((a, b) =>
    a.name.localeCompare(b.name, "es"),
  );
};

export const Incidents = () => {
  const {
    priority,
    status,
    assigneeId,
    setPriority,
    setStatus,
    setAssigneeId,
  } = useIncidentFiltersStore();

  const assignees = useMemo(() => getAssignees(incidents), []);

  const filteredIncidents = useMemo(() => {
    return sortIncidents(
      incidents.filter((incident) => {
        const matchesPriority =
          priority === "all" || incident.priority === priority;
        const matchesStatus = status === "all" || incident.status === status;
        const matchesAssignee =
          assigneeId === "all" ||
          incident.assignees.some((assignee) => assignee.id === assigneeId);

        return matchesPriority && matchesStatus && matchesAssignee;
      }),
    );
  }, [assigneeId, priority, status]);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>Gestion de incidencias</p>
          <h1>Incidencias</h1>
          <p>
            Lista priorizada por criticidad, responsable asignado y fecha de
            vencimiento.
          </p>
        </div>
      </header>

      <IssueFilters
        priority={priority}
        status={status}
        assigneeId={assigneeId}
        assignees={assignees}
        resultCount={filteredIncidents.length}
        onPriorityChange={setPriority}
        onStatusChange={setStatus}
        onAssigneeChange={setAssigneeId}
      />

      <IssueList
        key={`${priority}-${status}-${assigneeId}`}
        incidents={filteredIncidents}
      />
    </div>
  );
};
