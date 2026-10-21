export const metadata = {
  title: 'Panel del dueño',
  robots: 'noindex, nofollow',
  // openGraph propio: si no, heredaría el de la portada y una captura del panel
  // parecería la portada del hostal al compartir el enlace.
  openGraph: {
    type: 'website',
    title: 'Panel del dueño — Hostal Hudson',
    description: 'Acceso privado al panel de reservas de Hostal Hudson.',
  },
};

export default function AdminLayout({ children }) {
  return <>{children}</>;
}
