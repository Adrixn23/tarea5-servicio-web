const fs = require('fs');
const path = require('path');

const rutaArchivo = path.join(__dirname, '../data/contacts.json');

function leerContactos() {
  try {
    if (!fs.existsSync(rutaArchivo)) {
      fs.writeFileSync(rutaArchivo, '[]', 'utf8');
      return [];
    }
    const contenido = fs.readFileSync(rutaArchivo, 'utf8');
    return JSON.parse(contenido || '[]');
  } catch (error) {
    return [];
  }
}

function guardarContactos(contactos) {
  fs.writeFileSync(rutaArchivo, JSON.stringify(contactos, null, 2), 'utf8');
}

exports.listarContactos = (req, res) => {
  const contactos = leerContactos();
  res.json(contactos);
};

exports.almacenarContacto = (req, res) => {
  const { nombre, apellido, telefono } = req.body;

  if (!nombre || !apellido || !telefono) {
    return res.status(400).json({
      exito: false,
      mensaje: 'Los campos nombre, apellido y telefono son obligatorios'
    });
  }

  const contactos = leerContactos();

  const nuevoContacto = {
    nombre: String(nombre).trim(),
    apellido: String(apellido).trim(),
    telefono: String(telefono).trim()
  };

  contactos.push(nuevoContacto);
  guardarContactos(contactos);

  res.status(201).json({
    exito: true,
    mensaje: 'Contacto almacenado correctamente',
    contacto: nuevoContacto
  });
};
