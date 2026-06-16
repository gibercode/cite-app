import { Plus } from "lucide-react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Button, Map as MapView } from "@/components";
import { CARACAS_COORDINATES } from "@/constants";
import { useIncidentStore } from "@/store";
import type { LayoutOutletContext } from "@/types";
import styles from "./styles.module.scss";

export const MapPage = () => {
  const navigate = useNavigate();
  const incidents = useIncidentStore((state) => state.incidents);
  const { openCreateIncidentModal } =
    useOutletContext<LayoutOutletContext>();
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
        onMarkerClick={(marker) => navigate(`/incidencias/${marker.id}`)}
        zoom={11}
      />
    </div>
  );
};
