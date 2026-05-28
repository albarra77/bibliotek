import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <div>
      <h1>Página no encontrada</h1>
      <p>La URL que buscas no existe.</p>
      <Link to="/">Volver al inicio</Link>
    </div>
  );
}
