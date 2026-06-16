import type { User } from "firebase/auth";

export type AuthStoreState = {
  user: User | null;
  isAuth: boolean;
  setUser: (user: User | null) => void;
  setIsAuth: (isAuth: boolean) => void;
};
