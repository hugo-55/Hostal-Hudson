import PrivacidadClient from '../../components/pages/PrivacidadClient';
import { SEO, openGraph } from '../../lib/seo';

export const metadata = {
  title: { absolute: SEO.privacidad.es.title },
  description: SEO.privacidad.es.description,
  alternates: { canonical: '/privacidad' },
  openGraph: openGraph(SEO.privacidad.es, '/privacidad'),
};

export default function PrivacidadPage() {
  return <PrivacidadClient />;
}
