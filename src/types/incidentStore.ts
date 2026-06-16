import type { Incident } from "./incident";

export type CreateIncidentInput = Pick<
  Incident,
  | "title"
  | "description"
  | "priority"
  | "type"
  | "assignees"
  | "observers"
  | "coordinates"
  | "locationDescription"
  | "dueDate"
  | "tags"
  | "media"
>;

export type IncidentStoreState = {
  incidents: Incident[];
  addIncident: (incident: CreateIncidentInput) => void;
};
