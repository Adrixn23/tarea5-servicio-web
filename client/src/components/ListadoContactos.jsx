import React, { useState } from 'react';
import { Search, Users, Phone, UserCheck, Inbox } from 'lucide-react';

const PALETA_AVATARES = [
  '#4f46e5', '#0284c7', '#059669', '#d97706', '#db2777', 
  '#7c3aed', '#0891b2', '#ea580c', '#6366f1'
];

function obtenerColorAvatar(nombre = '') {
  let hash = 0;
  for (let i = 0; i < nombre.length; i++) {
    hash = nombre.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % PALETA_AVATARES.length;
  return PALETA_AVATARES[index];
}

function obtenerIniciales(nombre = '', apellido = '') {
  const n = (nombre || '').trim()[0] || '';
  const a = (apellido || '').trim()[0] || '';
  return (n + a).toUpperCase() || '?';
}

export default function ListadoContactos({ contactos, cargando }) {
  const [busqueda, setBusqueda] = useState('');

  const filtrados = contactos.filter(c => {
    const texto = `${c.nombre || ''} ${c.apellido || ''} ${c.telefono || ''}`.toLowerCase();
    return texto.includes(busqueda.toLowerCase().trim());
  });

  return (
    <section className="listado-card">
      <div className="listado-header">
        <div className="listado-titulo-wrapper">
          <div className="icon-wrapper secondary">
            <Users size={20} />
          </div>
          <div>
            <h3>Contactos Almacenados</h3>
            <p>
              {contactos.length} contactos sincronizados en tiempo real
            </p>
          </div>
        </div>

        <div className="search-box">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            placeholder="Buscar por nombre, apellido o teléfono..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>
      </div>

      {cargando ? (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Cargando contactos desde la API...</p>
        </div>
      ) : filtrados.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">
            <Inbox size={32} />
          </div>
          <h4>No se encontraron contactos</h4>
          <p>
            {busqueda
              ? 'No hay resultados que coincidan con la búsqueda.'
              : 'La agenda no tiene contactos registrados aún.'}
          </p>
        </div>
      ) : (
        <div className="contacts-grid">
          {filtrados.map((contacto, index) => {
            const nombreCompleto = `${contacto.nombre || ''} ${contacto.apellido || ''}`.trim() || 'Sin Nombre';
            const iniciales = obtenerIniciales(contacto.nombre, contacto.apellido);
            const color = obtenerColorAvatar(nombreCompleto);

            return (
              <div key={index} className="contact-card">
                <div className="contact-avatar" style={{ backgroundColor: color }}>
                  {iniciales}
                </div>
                <div className="contact-info">
                  <h4 title={nombreCompleto}>{nombreCompleto}</h4>
                  <div className="contact-phone">
                    <Phone size={13} />
                    <span>{contacto.telefono || 'Sin teléfono'}</span>
                  </div>
                </div>
                <div className="contact-badge-status">
                  <UserCheck size={13} />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
