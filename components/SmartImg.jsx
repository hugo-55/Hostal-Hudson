'use client';
import Image from 'next/image';

// Imagen optimizada (WebP automático en Vercel) con contenedor de alto fijo.
export default function SmartImg({ src, alt, height = 230, className = '' }) {
  return (
    <span className={`smart-img ${className}`} style={{ height }}>
      <Image src={src} alt={alt} fill sizes="(max-width: 720px) 100vw, 50vw" loading="lazy" style={{ objectFit: 'cover' }} />
    </span>
  );
}
