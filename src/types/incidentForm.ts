import type { Priority } from "./priority";

export type IncidentFormValues = {
  title: string;
  description: string;
  dueDate: string;
  categoryId: string;
  priority: Priority;
  tagIds: string[];
  assigneeIds: string[];
  observerIds: string[];
  locationDescription: string;
  latitude: string;
  longitude: string;
  attachments?: FileList;
};
