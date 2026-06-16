import { Plus } from "lucide-react";
import { Button, Map as MapView } from "@/components";
import { CARACAS_COORDINATES } from "@/constants";
import { useCreateIncidentModalStore, useIncidentStore } from "@/store";
import styles from "./styles.module.scss";

export const MapPage = () => {
  const incidents = useIncidentStore((state) => state.incidents);
  const openCreateIncidentModal = useCreateIncidentModalStore(
    (state) => state.openCreateIncidentModal,
  );
  const incidentMarkers = incidents.map((incident) => ({
    id: incident.id,
    title: incident.title,
    coordinates: [
      incident.coordinates.lng,
      incident.coordinates.lat,
    ] satisfies [number, number],
  }));

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>Mapa de incidencias</p>
          <h1>Mapa</h1>
          <p>Vista geografica de incidencias y puntos de seguimiento.</p>
        </div>

        <Button
          className={styles.createButton}
          icon={<Plus aria-hidden="true" size={18} />}
          onClick={openCreateIncidentModal}
        >
          Crear incidencia
        </Button>
      </header>

      <MapView
        center={CARACAS_COORDINATES}
        height="min(64vh, 720px)"
        markers={incidentMarkers}
        zoom={11}
      />
    </div>
  );
};
