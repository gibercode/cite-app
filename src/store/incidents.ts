import { create } from "zustand";
import dummyData from "@/assets/dummy-data.json";
import type { CreateIncidentInput, Incident, IncidentStoreState } from "@/types";

const initialIncidents = dummyData as Incident[];

const createSequenceId = (order: number) => order.toString().padStart(4, "0");

export const useIncidentStore = create<IncidentStoreState>((set, get) => ({
  incidents: initialIncidents,
  addIncident: (input: CreateIncidentInput) => {
    const incidents = get().incidents;
    const order = incidents.length + 1;
    const now = new Date().toISOString();
    const owner =
      input.assignees[0] ??
      incidents.find((incident) => incident.owner)?.owner ??
      null;

    const incident: Incident = {
      ...input,
      id: crypto.randomUUID(),
      sequenceId: createSequenceId(order),
      order,
      status: "open",
      approval: false,
      project: incidents[0].project,
      owner,
      closingDate: null,
      createdAt: now,
      updatedAt: now,
    };

    set({ incidents: [incident, ...incidents] });
  },
}));
