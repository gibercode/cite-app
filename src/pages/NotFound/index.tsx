import { Link } from "react-router-dom";
import styles from "./styles.module.scss";

export const NotFound = () => {
  return (
    <div className={styles.page}>
      <section className={styles.panel}>
        <p className={styles.eyebrow}>404</p>
        <h1>Pagina no encontrada</h1>
        <p>
          La ruta que intentas abrir no existe o fue movida dentro del panel.
        </p>
        <Link className={styles.link} to="/">
          Volver al inicio
        </Link>
      </section>
    </div>
  );
};
