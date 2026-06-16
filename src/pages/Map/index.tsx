import { Plus } from "lucide-react";
import { Map as MapView } from "@/components";
import { CARACAS_COORDINATES } from "@/constants";
import styles from "./styles.module.scss";

export const MapPage = () => {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>Mapa de incidencias</p>
          <h1>Mapa</h1>
          <p>Vista geografica de incidencias y puntos de seguimiento.</p>
        </div>

        <button className={styles.createButton} type="button">
          <Plus aria-hidden="true" size={18} />
          Crear incidencia
        </button>
      </header>

      <MapView
        center={CARACAS_COORDINATES}
        height="min(64vh, 720px)"
        zoom={11}
      />
    </div>
  );
};
