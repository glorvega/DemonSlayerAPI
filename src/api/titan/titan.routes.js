const express = require('express');
const { getAllTitans, getTitan, postNewTitan, putTitan, deleteTitan } = require('./titan.controller');
const upload = require('../../utils/middlewares/uploadFile.middleware');
const TitanRoutes = express.Router();

TitanRoutes.get('/', getAllTitans);
TitanRoutes.get('/:id', getTitan);
TitanRoutes.post('/', upload.single('image'), postNewTitan);
TitanRoutes.put('/:id', upload.single('image'), putTitan);
TitanRoutes.delete('/:id', deleteTitan);

module.exports = TitanRoutes;