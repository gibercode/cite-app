import type { Person } from "./person";
import type { IncidentStatus, Priority } from "./priority";

export type Incident = {
  id: string;
  sequenceId: string;
  order: number;
  title: string;
  description: string;
  priority: Priority;
  status: IncidentStatus;
  approval: boolean;
  type: {
    id: string;
    key: string;
    name: string;
    name_en: string;
  };
  project: {
    id: string;
    name: string;
  };
  owner: Person;
  assignees: Person[];
  observers: Person[];
  locationDescription: string;
  dueDate: string | null;
  closingDate: string | null;
  createdAt: string;
  updatedAt: string;
  tags: Array<{
    id: string;
    name: string;
    color: string;
  }>;
};
