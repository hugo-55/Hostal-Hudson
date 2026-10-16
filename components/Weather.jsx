'use client';
import { useEffect, useState } from 'react';
import { useLang } from '../lib/i18n';

const CODE = {
  0: { es: 'Despejado', en: 'Clear', icon: '☀️' },
  1: { es: 'Mayormente despejado', en: 'Mostly clear', icon: '🌤️' },
  2: { es: 'Parcialmente nublado', en: 'Partly cloudy', icon: '⛅' },
  3: { es: 'Nublado', en: 'Overcast', icon: '☁️' },
  45: { es: 'Niebla', en: 'Fog', icon: '🌫️' },
  48: { es: 'Niebla', en: 'Fog', icon: '🌫️' },
  51: { es: 'Llovizna', en: 'Drizzle', icon: '🌦️' },
  61: { es: 'Lluvia', en: 'Rain', icon: '🌧️' },
  71: { es: 'Nieve', en: 'Snow', icon: '🌨️' },
  80: { es: 'Chubascos', en: 'Showers', icon: '🌧️' },
  95: { es: 'Tormenta', en: 'Storm', icon: '⛈️' },
};

// Clima en vivo de Puerto Aysén (Open-Meteo, gratis, sin clave).
export default function Weather() {
  const { t, lang } = useLang();
  const [w, setW] = useState(null);
  useEffect(() => {
    fetch('https://api.open-meteo.com/v1/forecast?latitude=-45.4&longitude=-72.69&current=temperature_2m,weather_code&timezone=America%2FSantiago')
      .then((r) => r.json())
      .then((d) => setW(d.current))
      .catch(() => setW(null));
  }, []);
  if (!w) return null;
  const info = CODE[w.weather_code] || { es: 'Variable', en: 'Changeable', icon: '🌡️' };
  return (
    <span className="badge">
      {info.icon} {t.weather.now}: {Math.round(w.temperature_2m)}°C · {lang === 'es' ? info.es : info.en}
    </span>
  );
}
