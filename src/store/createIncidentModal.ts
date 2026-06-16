import { create } from "zustand";
import type { CreateIncidentModalState } from "@/types";

export const useCreateIncidentModalStore = create<CreateIncidentModalState>(
  (set) => ({
    isCreateIncidentModalOpen: false,
    openCreateIncidentModal: () => set({ isCreateIncidentModalOpen: true }),
    closeCreateIncidentModal: () => set({ isCreateIncidentModalOpen: false }),
  }),
);
