import type { Person } from "./person";
import type { PriorityFilter, StatusFilter } from "./priority";

export type IssueFiltersProps = {
  priority: PriorityFilter;
  status: StatusFilter;
  assigneeId: string;
  assignees: Person[];
  resultCount: number;
  onPriorityChange: (priority: PriorityFilter) => void;
  onStatusChange: (status: StatusFilter) => void;
  onAssigneeChange: (assigneeId: string) => void;
};
