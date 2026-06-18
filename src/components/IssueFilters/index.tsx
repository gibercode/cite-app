import { ChevronDown, SlidersHorizontal } from "lucide-react";
import { priorityOptions, statusOptions } from "@/constants";
import { Input } from "@/components/Input";
import { Select } from "@/components/Select";
import { useIntermitence } from "@/hooks/useIntermitence";
import type { IssueFiltersProps, PriorityFilter, StatusFilter } from "@/types";
import styles from "./styles.module.scss";

export const IssueFilters = ({
  priority,
  status,
  assigneeId,
  searchQuery,
  assignees,
  resultCount,
  onPriorityChange,
  onStatusChange,
  onAssigneeChange,
  onSearchQueryChange,
}: IssueFiltersProps) => {
  const { status: isFiltersOpen, switchStatus: switchFiltersOpen } =
    useIntermitence();
  const activeFilterCount = [
    priority !== "all",
    status !== "all",
    assigneeId !== "all",
  ].filter(Boolean).length;
  const assigneeOptions = [
    { value: "all", label: "Todos" },
    ...assignees.map((assignee) => ({
      value: assignee.id,
      label: assignee.name,
    })),
  ];

  return (
    <section className={styles.toolbar} aria-label="Filtros de incidencias">
      <div className={styles.mainRow}>
        <div className={styles.summary}>
          <p className={styles.eyebrow}>Incidencias ordenadas</p>
          <h2 className={styles.title}>{resultCount} resultados</h2>
        </div>

        <Input
          className={styles.search}
          label="Buscar"
          type="search"
          value={searchQuery}
          placeholder="Titulo o descripcion..."
          onChange={onSearchQueryChange}
        />

        <button
          className={styles.filterButton}
          type="button"
          aria-expanded={isFiltersOpen}
          aria-controls="issue-filter-dropdown"
          onClick={switchFiltersOpen}
        >
          <SlidersHorizontal aria-hidden="true" size={18} />
          <span>Filtros</span>
          {activeFilterCount > 0 ? (
            <strong>{activeFilterCount}</strong>
          ) : null}
          <ChevronDown
            aria-hidden="true"
            className={isFiltersOpen ? styles.chevronOpen : ""}
            size={18}
          />
        </button>
      </div>

      {isFiltersOpen ? (
        <div className={styles.dropdown} id="issue-filter-dropdown">
          <div className={styles.controls}>
            <Select
              className={styles.control}
              label="Prioridad"
              value={priority}
              options={priorityOptions}
              onChange={(value) => onPriorityChange(value as PriorityFilter)}
            />

            <Select
              className={styles.control}
              label="Estado"
              value={status}
              options={statusOptions}
              onChange={(value) => onStatusChange(value as StatusFilter)}
            />

            <Select
              className={styles.control}
              label="Asignado"
              value={assigneeId}
              options={assigneeOptions}
              onChange={onAssigneeChange}
            />
          </div>
        </div>
      ) : null}
    </section>
  );
};
