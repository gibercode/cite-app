import type {
  IncidentStatus,
  Priority,
  PriorityOption,
  StatusOption,
} from "@/types";

export const priorityWeight: Record<Priority, number> = {
  high: 3,
  medium: 2,
  low: 1,
};

export const priorityOptions: PriorityOption[] = [
  { value: "all", label: "Todas" },
  { value: "high", label: "Alta" },
  { value: "medium", label: "Media" },
  { value: "low", label: "Baja" },
];

export const priorityLabel: Record<Priority, string> = {
  high: "Alta",
  medium: "Media",
  low: "Baja",
};

export const statusLabel: Record<IncidentStatus, string> = {
  open: "Abierta",
  on_pause: "En pausa",
  closed: "Cerrada",
};

export const statusOptions: StatusOption[] = [
  { value: "all", label: "Todos" },
  { value: "open", label: "Abierta" },
  { value: "on_pause", label: "En pausa" },
  { value: "closed", label: "Cerrada" },
];

export const statusOrder: IncidentStatus[] = ["open", "on_pause", "closed"];

export const priorityOrder: Priority[] = ["high", "medium", "low"];

export const CARACAS_COORDINATES: [number, number] = [-66.9036, 10.4806];

export const CREATE_INCIDENT_STEPS = [
  "General",
  "Clasificacion",
  "Ubicacion",
];
