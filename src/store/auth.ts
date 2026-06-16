import { create } from "zustand";
import type { AuthStoreState } from "@/types";

export const useAuthStore = create<AuthStoreState>((set) => ({
  user: null,
  isAuth: false,
  setUser: (user) => set({ user }),
  setIsAuth: (isAuth) => set({ isAuth }),
}));
