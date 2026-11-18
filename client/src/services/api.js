const API_URL = 'http://localhost:4000/contactos';

export const contactoService = {
  async obtenerTodos() {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error('Error al consultar los contactos');
    const datos = await res.json();
    return Array.isArray(datos) ? datos : [];
  },

  async crear(contacto) {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nombre: contacto.nombre,
        apellido: contacto.apellido,
        telefono: contacto.telefono
      })
    });
    if (!res.ok) throw new Error('Error al almacenar el contacto');
    return res.json();
  }
};
