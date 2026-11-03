# Tarea 4: Agenda React

**Estudiante:** Adrian Brito Nelkitts  
**Matrícula:** 20251150  
**Materia:** Programación Web  
**Fecha:** 3 de noviembre 2026  
**Servicio Web:** [http://www.raydelto.org/agenda.php](http://www.raydelto.org/agenda.php)

---

## 📸 Evidencias de la Aplicación

![Vista General de la Agenda](docs/screenshots/screenshot2.png)

![Detalles e Interfaz de Contactos](docs/screenshots/screenshot3.png)

![Consola y Ejecución de Servicios](docs/screenshots/screenshot1.png)

---

## 📌 Resumen del Proyecto

Implementación de la **Tarea 4: Agenda React** consumiendo directamente la API pública oficial provista por el maestro Raydelto:

1. **Componente Padre (`App.jsx`):** Gestiona el estado general, sincronización de datos con el servicio web y notificaciones de usuario.
2. **Componente de Listado (`ListadoContactos.jsx`):** Consume mediante petición HTTP `GET` todos los contactos en formato JSON (`http://www.raydelto.org/agenda.php`) con buscador reactivo e indicadores visuales.
3. **Componente para Agregar Contactos (`AgregarContacto.jsx`):** Envía mediante HTTP `POST` los campos `nombre`, `apellido` y `telefono` en formato JSON para almacenar nuevos registros.

---

## 🚀 Ejecución

1. **Instalar dependencias:**
   ```bash
   cd client && npm install && cd ..
   ```

2. **Iniciar la aplicación:**
   ```bash
   npm run client
   ```
   O para ejecutar en modo concurrente:
   ```bash
   npm run dev
   ```

- Frontend: [http://localhost:5173](http://localhost:5173)
