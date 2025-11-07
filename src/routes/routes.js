const express = require('express');
const router = express.Router();
const { produtoRoutes } = require('./produtosRoutes');
const { clienteRoutes} = require('./clientesRoutes');


router.use('/', produtoRoutes);
router.use('/', clienteRoutes);

module.exports = { router };