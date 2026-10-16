'use client';
import { useState } from 'react';

// Menú móvil con hamburguesa + aparición suave de secciones al hacer scroll.
export function NavBar() {
  const [open, setOpen] = useState(false);
  return (
    <div className="topbar">
      <div className="topbar-inner">
        <a className="logo" href="/"><img src="/img/logo.png" alt="Hostal Hudson" /> <span>Hostal Hudson<small>Puerto Aysén · Patagonia</small></span></a>
        <button className={`burger ${open ? 'open' : ''}`} onClick={() => setOpen(!open)} aria-label="Menú">
          <span /><span /><span />
        </button>
        <nav className={`nav ${open ? 'open' : ''}`}>
          <a href="/" onClick={() => setOpen(false)}>Inicio</a>
          <a href="/habitaciones" onClick={() => setOpen(false)}>Habitaciones</a>
          <a href="/tarifas" onClick={() => setOpen(false)}>Tarifas</a>
          <a href="/galeria" onClick={() => setOpen(false)}>Galería</a>
          <a className="nav-cta" href="/reservas" onClick={() => setOpen(false)}>Reservar</a>
        </nav>
      </div>
    </div>
  );
}
