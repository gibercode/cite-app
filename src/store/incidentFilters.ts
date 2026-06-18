import { create } from "zustand";
import type { IncidentFiltersState } from "@/types";

export const useIncidentFiltersStore = create<IncidentFiltersState>((set) => ({
  priority: "all",
  status: "all",
  assigneeId: "all",
  searchQuery: "",
  setPriority: (priority) => set({ priority }),
  setStatus: (status) => set({ status }),
  setAssigneeId: (assigneeId) => set({ assigneeId }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  resetFilters: () =>
    set({ priority: "all", status: "all", assigneeId: "all", searchQuery: "" }),
}));
