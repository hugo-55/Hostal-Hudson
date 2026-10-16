import { SITE_URL } from '../lib/site';

export default function sitemap() {
  const pages = ['', '/habitaciones', '/tarifas', '/galeria', '/visitar', '/guia', '/reservas'];
  return pages.map((p) => ({
    url: `${SITE_URL}${p}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: p === '' ? 1 : 0.8,
  }));
}
