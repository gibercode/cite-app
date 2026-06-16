import { priorityOptions, statusOptions } from "@/constants";
import { Select } from "@/components/Select";
import type { IssueFiltersProps, PriorityFilter, StatusFilter } from "@/types";
import styles from "./styles.module.scss";

export const IssueFilters = ({
  priority,
  status,
  assigneeId,
  assignees,
  resultCount,
  onPriorityChange,
  onStatusChange,
  onAssigneeChange,
}: IssueFiltersProps) => {
  const assigneeOptions = [
    { value: "all", label: "Todos" },
    ...assignees.map((assignee) => ({
      value: assignee.id,
      label: assignee.name,
    })),
  ];

  return (
    <section className={styles.toolbar} aria-label="Filtros de incidencias">
      <div>
        <p className={styles.eyebrow}>Incidencias ordenadas</p>
        <h2 className={styles.title}>{resultCount} resultados</h2>
      </div>

      <div className={styles.controls}>
        <Select
          label="Prioridad"
          value={priority}
          options={priorityOptions}
          onChange={(value) => onPriorityChange(value as PriorityFilter)}
        />

        <Select
          label="Estado"
          value={status}
          options={statusOptions}
          onChange={(value) => onStatusChange(value as StatusFilter)}
        />

        <Select
          label="Asignado"
          value={assigneeId}
          options={assigneeOptions}
          onChange={onAssigneeChange}
        />
      </div>
    </section>
  );
};
