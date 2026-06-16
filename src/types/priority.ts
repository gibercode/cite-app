export type Priority = "high" | "medium" | "low";
export type PriorityFilter = Priority | "all";
export type IncidentStatus = "open" | "on_pause" | "closed";
export type StatusFilter = IncidentStatus | "all";

export type PriorityOption = {
  value: PriorityFilter;
  label: string;
};

export type StatusOption = {
  value: StatusFilter;
  label: string;
};
