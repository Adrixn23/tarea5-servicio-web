import React, { useState, useEffect } from 'react';
import { RefreshCw, Server, Users, Send, Database } from 'lucide-react';
import { contactoService } from './services/api';
import AgregarContacto from './components/AgregarContacto';
import ListadoContactos from './components/ListadoContactos';

export default function App() {
  const [contactos, setContactos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [toast, setToast] = useState(null);

  const mostrarNotificacion = (mensaje, tipo = 'success') => {
    setToast({ mensaje, tipo });
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  const cargarContactos = async () => {
    try {
      setCargando(true);
      const data = await contactoService.obtenerTodos();
      setContactos([...data].reverse());
    } catch (error) {
      mostrarNotificacion('Error al conectar con el servicio web', 'error');
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarContactos();
  }, []);

  const handleAgregarContacto = async (nuevoContacto, callbackExito) => {
    try {
      setGuardando(true);
      await contactoService.crear(nuevoContacto);
      mostrarNotificacion('Contacto registrado correctamente');
      if (callbackExito) callbackExito();
      cargarContactos();
    } catch (error) {
      mostrarNotificacion('No se pudo guardar el contacto', 'error');
    } finally {
      setGuardando(false);
    }
  };

  return (
    <div className="app-container">
      {toast && (
        <div className="toast-container">
          <div className={`toast ${toast.tipo}`}>
            {toast.mensaje}
          </div>
        </div>
      )}

      <header className="app-header">
        <div>
          <div className="brand-badge">
            <Server size={13} />
            <span>Programación Web · ITLA</span>
          </div>
          <h1 className="brand-title">Servicio Web Express</h1>
          <div className="brand-subtitle">
            <span>Tarea 5: Servicio Web de Contactos</span>
            <span className="tag-academic">Adrian Brito Nelkitts · 20251150</span>
          </div>
        </div>

        <div className="header-actions">
          <div className="pulse-indicator">
            <span className="pulse-dot"></span>
            <span>API Online :4000</span>
          </div>
          <button
            className="btn btn-secondary"
            onClick={cargarContactos}
            disabled={cargando}
          >
            <RefreshCw size={15} className={cargando ? 'animate-spin' : ''} />
            <span>Sincronizar</span>
          </button>
        </div>
      </header>

      <section className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <Users size={22} />
          </div>
          <div>
            <div className="stat-label">Total Registrados</div>
            <div className="stat-value">{contactos.length}</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon cyan">
            <Database size={22} />
          </div>
          <div>
            <div className="stat-label">Operación GET</div>
            <div className="stat-value">/contactos</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon purple">
            <Send size={22} />
          </div>
          <div>
            <div className="stat-label">Operación POST</div>
            <div className="stat-value">JSON Payload</div>
          </div>
        </div>
      </section>

      <main className="agenda-layout">
        <AgregarContacto
          onAgregarContacto={handleAgregarContacto}
          cargando={guardando}
        />
        <ListadoContactos
          contactos={contactos}
          cargando={cargando}
        />
      </main>
    </div>
  );
}
