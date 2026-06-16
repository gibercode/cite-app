import { create } from "zustand";
import type { IncidentFiltersState } from "@/types";

export const useIncidentFiltersStore = create<IncidentFiltersState>((set) => ({
  priority: "all",
  status: "all",
  assigneeId: "all",
  setPriority: (priority) => set({ priority }),
  setStatus: (status) => set({ status }),
  setAssigneeId: (assigneeId) => set({ assigneeId }),
  resetFilters: () =>
    set({ priority: "all", status: "all", assigneeId: "all" }),
}));
