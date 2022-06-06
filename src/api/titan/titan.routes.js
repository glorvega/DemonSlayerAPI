const express = require('express');
const { getAllTitans, getTitan, postNewTitan, putTitan, deleteTitan } = require('./titan.controller');

const TitanRoutes = express.Router();

TitanRoutes.get('/', getAllTitans);
TitanRoutes.get('/:id', getTitan);
TitanRoutes.post('/', postNewTitan);
TitanRoutes.put('/:id', putTitan);
TitanRoutes.delete('/:id', deleteTitan);

module.exports = TitanRoutes;