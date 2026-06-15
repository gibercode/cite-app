import { Building2 } from "lucide-react";
import styles from "./styles.module.scss";

export const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <h1 className={styles.brand}>
        <Building2 size={24} strokeWidth={2.4} />
        CITE
      </h1>
      <div className={styles.avatar} aria-label="Usuario">
        LG
      </div>
    </nav>
  );
};
