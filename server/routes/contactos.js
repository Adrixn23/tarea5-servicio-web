const express = require('express');
const router = express.Router();
const contactosController = require('../controllers/contactosController');

router.get('/', contactosController.listarContactos);
router.post('/', contactosController.almacenarContacto);

module.exports = router;
