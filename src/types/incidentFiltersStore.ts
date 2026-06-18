import type { PriorityFilter, StatusFilter } from "./priority";

export type IncidentFiltersState = {
  priority: PriorityFilter;
  status: StatusFilter;
  assigneeId: string;
  searchQuery: string;
  setPriority: (priority: PriorityFilter) => void;
  setStatus: (status: StatusFilter) => void;
  setAssigneeId: (assigneeId: string) => void;
  setSearchQuery: (searchQuery: string) => void;
  resetFilters: () => void;
};
