import type { Person } from "./person";
import type { IncidentStatus, Priority } from "./priority";

export type IncidentCoordinates = {
  lat: number;
  lng: number;
};

export type IncidentMedia = {
  id: string;
  name: string;
  type: string;
  format: string;
  size: number;
  status: string;
  url: string;
};

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
  owner: Person | null;
  assignees: Person[];
  observers: Person[];
  coordinates: IncidentCoordinates;
  locationDescription: string;
  dueDate: string | null;
  closingDate: string | null;
  createdAt: string;
  updatedAt: string;
  media?: IncidentMedia[];
  tags: Array<{
    id: string;
    name: string;
    color: string;
  }>;
};
