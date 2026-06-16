import { Building2, LogOut } from "lucide-react";
import { logout } from "@/services/auth";
import { useAuthStore } from "@/store";
import styles from "./styles.module.scss";

export const Navbar = () => {
  const user = useAuthStore((state) => state.user);
  const displayName = user?.displayName ?? user?.email ?? "Usuario";
  const initials = displayName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <nav className={styles.navbar}>
      <h1 className={styles.brand}>
        <Building2 size={24} strokeWidth={2.4} />
        CITE
      </h1>

      <div className={styles.userMenu}>
        <div className={styles.avatar} aria-label={displayName}>
          {initials}
        </div>
        <button
          aria-label="Cerrar sesion"
          className={styles.logoutButton}
          type="button"
          onClick={() => void logout()}
        >
          <LogOut aria-hidden="true" size={18} />
        </button>
      </div>
    </nav>
  );
};
