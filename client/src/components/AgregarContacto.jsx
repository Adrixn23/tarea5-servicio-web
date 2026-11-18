import React, { useState } from 'react';
import { UserPlus, User, Phone, CheckCircle2 } from 'lucide-react';

export default function AgregarContacto({ onAgregarContacto, cargando }) {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [telefono, setTelefono] = useState('');
  const [errores, setErrores] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevosErrores = {};

    if (!nombre.trim()) nuevosErrores.nombre = 'El nombre es obligatorio';
    if (!apellido.trim()) nuevosErrores.apellido = 'El apellido es obligatorio';
    if (!telefono.trim()) nuevosErrores.telefono = 'El teléfono es obligatorio';

    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores);
      return;
    }

    setErrores({});
    onAgregarContacto({
      nombre: nombre.trim(),
      apellido: apellido.trim(),
      telefono: telefono.trim()
    }, () => {
      setNombre('');
      setApellido('');
      setTelefono('');
    });
  };

  return (
    <section className="form-card">
      <div className="card-header-styled">
        <div className="icon-wrapper">
          <UserPlus size={20} />
        </div>
        <div>
          <h3>Almacenar Contacto</h3>
          <p>Envía una petición POST al servicio Express</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-grid">
          <div className="input-group">
            <label htmlFor="nombre">
              <User size={14} /> Nombre
            </label>
            <input
              id="nombre"
              type="text"
              placeholder="Ej. Adrian"
              value={nombre}
              onChange={(e) => {
                setNombre(e.target.value);
                if (errores.nombre) setErrores(prev => ({ ...prev, nombre: null }));
              }}
              disabled={cargando}
            />
            {errores.nombre && <span className="error-text">{errores.nombre}</span>}
          </div>

          <div className="input-group">
            <label htmlFor="apellido">
              <User size={14} /> Apellido
            </label>
            <input
              id="apellido"
              type="text"
              placeholder="Ej. Brito"
              value={apellido}
              onChange={(e) => {
                setApellido(e.target.value);
                if (errores.apellido) setErrores(prev => ({ ...prev, apellido: null }));
              }}
              disabled={cargando}
            />
            {errores.apellido && <span className="error-text">{errores.apellido}</span>}
          </div>

          <div className="input-group">
            <label htmlFor="telefono">
              <Phone size={14} /> Teléfono
            </label>
            <input
              id="telefono"
              type="tel"
              placeholder="Ej. 809-555-1150"
              value={telefono}
              onChange={(e) => {
                setTelefono(e.target.value);
                if (errores.telefono) setErrores(prev => ({ ...prev, telefono: null }));
              }}
              disabled={cargando}
            />
            {errores.telefono && <span className="error-text">{errores.telefono}</span>}
          </div>
        </div>

        <button type="submit" className="btn btn-primary submit-btn" disabled={cargando}>
          {cargando ? (
            'Guardando...'
          ) : (
            <>
              <CheckCircle2 size={16} /> Guardar Contacto
            </>
          )}
        </button>
      </form>
    </section>
  );
}
