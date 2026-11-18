const express = require('express');
const cors = require('cors');
const contactosRoutes = require('./routes/contactos');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', contactosRoutes);
app.use('/agenda.php', contactosRoutes);
app.use('/contactos', contactosRoutes);
app.use('/api/contactos', contactosRoutes);

app.listen(PORT, () => {
  console.log(`Servicio web corriendo en http://localhost:${PORT}`);
});
