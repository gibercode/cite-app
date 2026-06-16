import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "@/config/firebase";
import { useAuthStore } from "@/store";
import type { AuthProviderProps } from "@/types";

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const setUser = useAuthStore((state) => state.setUser);
  const setIsAuth = useAuthStore((state) => state.setIsAuth);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      setUser(user);
      setIsAuth(true);
    });

    return unsubscribe;
  }, [setIsAuth, setUser]);

  return children;
};
