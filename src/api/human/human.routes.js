const express = require('express');
const { getAllHumans, getHuman, postNewHuman, putHuman, deleteHuman } = require('./human.controller');
const upload = require('../../utils/middlewares/uploadFile.middleware');
const HumanRoutes = express.Router();

HumanRoutes.get('/', getAllHumans);
HumanRoutes.get('/:id', getHuman);
HumanRoutes.post('/', upload.single('image'), postNewHuman);
HumanRoutes.put('/:id', upload.single('image'), putHuman);
HumanRoutes.delete('/:id', deleteHuman);

module.exports = HumanRoutes;