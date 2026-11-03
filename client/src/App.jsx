import React, { useState, useEffect } from 'react';
import { Sparkles, RefreshCw, BookOpen, Layers } from 'lucide-react';
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
    }, 3200);
  };

  const cargarContactos = async () => {
    try {
      setCargando(true);
      const data = await contactoService.obtenerTodos();
      setContactos(data.reverse());
    } catch (error) {
      mostrarNotificacion('Error al conectar con la API de Raydelto', 'error');
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
      mostrarNotificacion('Contacto agregado a la agenda con éxito');
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
            {toast.tipo === 'success' ? '✓' : '⚠️'} {toast.mensaje}
          </div>
        </div>
      )}

      <header className="app-header">
        <div>
          <div className="brand-badge">
            <Sparkles size={14} />
            <span>Programación Web · ITLA</span>
          </div>
          <h1 className="brand-title">Agenda React</h1>
          <div className="brand-subtitle">
            <span>Tarea 4: Consumo de Servicio Web (raydelto.org/agenda.php)</span>
            <span className="tag-academic">Adrian Brito Nelkitts · 20251150</span>
          </div>
        </div>

        <div className="header-actions">
          <button 
            className="btn btn-secondary" 
            onClick={cargarContactos}
            disabled={cargando}
            title="Sincronizar con API externa"
          >
            <RefreshCw size={16} className={cargando ? 'animate-spin' : ''} />
            <span>Sincronizar</span>
          </button>
        </div>
      </header>

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
