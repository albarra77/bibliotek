import { Link } from 'react-router-dom';

interface Props {
  backTo?: string;
  backLabel?: string;
}

export function NotFoundPage({ backTo = '/', backLabel = 'Volver al inicio' }: Props) {
  return (
    <div>
      <h1>Página no encontrada</h1>
      <p>La URL que buscas no existe.</p>
      <Link to={backTo}>{backLabel}</Link>
    </div>
  );
}
