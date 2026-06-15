import { Link } from "react-router-dom";

function NotFound() {
  return (
    <section>
      <h1>Pagina no encontrada</h1>
      <Link to="/">Volver al inicio</Link>
    </section>
  );
}

export default NotFound;
