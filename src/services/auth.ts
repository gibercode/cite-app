import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { firebaseAuth } from "@/config/firebase";

const googleProvider = new GoogleAuthProvider();

export const loginWithEmailAndPassword = (email: string, password: string) => {
  return signInWithEmailAndPassword(firebaseAuth, email, password);
};

export const loginWithGoogle = () => {
  return signInWithPopup(firebaseAuth, googleProvider);
};

export const logout = () => {
  return signOut(firebaseAuth);
};
