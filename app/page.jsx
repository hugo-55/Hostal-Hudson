import HomeClient from '../components/pages/HomeClient';
import { SEO, openGraph } from '../lib/seo';

// Página de servidor: el título y la meta description se mandan en el HTML
// (antes solo existían después de hidratar, así que Google no los leía).
export const metadata = {
  title: { absolute: SEO.home.es.title },
  description: SEO.home.es.description,
  alternates: { canonical: '/' },
  openGraph: openGraph(SEO.home.es, '/'),
};

// Los datos estructurados del negocio (LodgingBusiness) se emiten una sola vez
// desde app/layout.jsx: aquí no se duplican.
export default function HomePage() {
  return <HomeClient />;
}
