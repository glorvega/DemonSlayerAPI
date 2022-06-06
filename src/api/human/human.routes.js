const express = require('express');
const { getAllHumans, getHuman, postNewHuman, putHuman, deleteHuman } = require('./human.controller');

const HumanRoutes = express.Router();

HumanRoutes.get('/', getAllHumans);
HumanRoutes.get('/:id', getHuman);
HumanRoutes.post('/', postNewHuman);
HumanRoutes.put('/:id', putHuman);
HumanRoutes.delete('/:id', deleteHuman);

module.exports = HumanRoutes;