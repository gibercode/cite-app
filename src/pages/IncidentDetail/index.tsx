import { Link, useParams } from "react-router-dom";
import { ArrowLeft, MapPin } from "lucide-react";
import { Map as MapView } from "@/components";
import { priorityLabel, statusLabel } from "@/constants";
import { useIncidentStore } from "@/store";
import { formatDate } from "@/utils";
import styles from "./styles.module.scss";

export const IncidentDetail = () => {
  const { incidentId } = useParams();
  const incident = useIncidentStore((state) =>
    state.incidents.find((item) => item.id === incidentId),
  );

  if (!incident) {
    return (
      <div className={styles.page}>
        <Link className={styles.backLink} to="/incidencias">
          <ArrowLeft aria-hidden="true" size={18} />
          Volver a incidencias
        </Link>
        <section className={styles.empty}>
          No se encontro la incidencia solicitada.
        </section>
      </div>
    );
  }

  const coordinates = [
    incident.coordinates.lng,
    incident.coordinates.lat,
  ] satisfies [number, number];

  return (
    <div className={styles.page}>
      <Link className={styles.backLink} to="/incidencias">
        <ArrowLeft aria-hidden="true" size={18} />
        Volver a incidencias
      </Link>

      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>Incidencia #{incident.sequenceId}</p>
          <h1>{incident.title}</h1>
          <p>{incident.description}</p>
        </div>

        <div className={styles.badges}>
          <span className={`${styles.priority} ${styles[incident.priority]}`}>
            {priorityLabel[incident.priority]}
          </span>
          <span className={`${styles.status} ${styles[incident.status]}`}>
            {statusLabel[incident.status]}
          </span>
        </div>
      </header>

      <section className={styles.summaryGrid}>
        <div className={styles.panel}>
          <h2>Informacion general</h2>
          <dl className={styles.details}>
            <div>
              <dt>Proyecto</dt>
              <dd>{incident.project.name}</dd>
            </div>
            <div>
              <dt>Categoria</dt>
              <dd>{incident.type.name}</dd>
            </div>
            <div>
              <dt>Fecha de vencimiento</dt>
              <dd>{formatDate(incident.dueDate)}</dd>
            </div>
            <div>
              <dt>Creada</dt>
              <dd>{formatDate(incident.createdAt)}</dd>
            </div>
            <div>
              <dt>Actualizada</dt>
              <dd>{formatDate(incident.updatedAt)}</dd>
            </div>
            <div>
              <dt>Aprobacion</dt>
              <dd>{incident.approval ? "Aprobada" : "Pendiente"}</dd>
            </div>
          </dl>
        </div>

        <div className={styles.panel}>
          <h2>Personas</h2>
          <div className={styles.peopleList}>
            <div className={styles.peopleBlock}>
              <h3>Responsable</h3>
              <p>{incident.owner?.name ?? "Sin responsable principal"}</p>
            </div>
            <div className={styles.peopleBlock}>
              <h3>Asignados</h3>
              <p>
                {incident.assignees.map((person) => person.name).join(", ") ||
                  "Sin asignados"}
              </p>
            </div>
            <div className={styles.peopleBlock}>
              <h3>Observadores</h3>
              <p>
                {incident.observers.map((person) => person.name).join(", ") ||
                  "Sin observadores"}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.panel}>
        <h2>Localizacion</h2>
        <div className={styles.locationHeader}>
          <MapPin aria-hidden="true" size={18} />
          <span>{incident.locationDescription}</span>
        </div>
        <MapView
          center={coordinates}
          height="18rem"
          markers={[
            {
              id: incident.id,
              title: incident.title,
              coordinates,
            },
          ]}
          zoom={13}
        />
      </section>

      <section className={styles.panel}>
        <h2>Etiquetas</h2>
        <div className={styles.tags}>
          {incident.tags.length ? (
            incident.tags.map((tag) => (
              <span key={tag.id} style={{ borderColor: tag.color }}>
                {tag.name}
              </span>
            ))
          ) : (
            <p className={styles.muted}>Sin etiquetas</p>
          )}
        </div>
      </section>

      <section className={styles.panel}>
        <h2>Archivos adjuntos</h2>
        {incident.media?.length ? (
          <div className={styles.mediaGrid}>
            {incident.media.map((media) => (
              <a
                className={styles.mediaItem}
                href={media.url}
                key={media.id}
                rel="noreferrer"
                target="_blank"
              >
                <img alt={media.name} src={media.url} />
                <span>{media.name}</span>
              </a>
            ))}
          </div>
        ) : (
          <p className={styles.muted}>Sin archivos adjuntos</p>
        )}
      </section>
    </div>
  );
};
