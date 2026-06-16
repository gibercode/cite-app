import type { PriorityFilter, StatusFilter } from "./priority";

export type IncidentFiltersState = {
  priority: PriorityFilter;
  status: StatusFilter;
  assigneeId: string;
  setPriority: (priority: PriorityFilter) => void;
  setStatus: (status: StatusFilter) => void;
  setAssigneeId: (assigneeId: string) => void;
  resetFilters: () => void;
};
