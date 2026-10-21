import Link from 'next/link';

// Next ya marca la 404 con noindex automáticamente.
export const metadata = {
  title: 'Página no encontrada',
};

export default function NotFound() {
  return (
    <div className="container" style={{ textAlign: 'center', paddingTop: 60 }}>
      <div style={{ fontSize: 64 }}>🧭</div>
      <h1>Esta ruta no lleva a Aysén</h1>
      <p className="muted">La página que buscas no existe o cambió de lugar.</p>
      <p>
        <Link className="btn btn-green" href="/">Volver al inicio</Link>{' '}
        <Link className="btn btn-outline" href="/reservas">Reservar estadía</Link>
      </p>
    </div>
  );
}
