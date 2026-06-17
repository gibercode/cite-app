import { LayoutGrid, MapPinned, Siren } from "lucide-react";
import { NavLink } from "react-router-dom";
import styles from "./styles.module.scss";

const links = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutGrid },
  { to: "/incidencias", label: "Incidencias", icon: Siren },
  { to: "/mapa", label: "Mapa", icon: MapPinned },
];

export const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <nav className={styles.nav} aria-label="Menu principal">
        {links.map((link) => {
          const Icon = link.icon;

          return (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `${styles.link} ${isActive ? styles.active : ""}`
              }
            >
              <Icon className={styles.icon} size={20} strokeWidth={2.2} />
              <span>{link.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};
