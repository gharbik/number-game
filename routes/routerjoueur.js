'use strict';
const joueurController = require('../controllers/joueurController');
const route = require('express').Router();

route.get('/all',joueurController.GetALLJoueur);
route.post('/save',joueurController.CreateJoueur);
route.post('/findone',joueurController.findByPseudo);
route.post('/login',joueurController.login);
route.put('/update/:id',joueurController.UpdateScore);

module.exports = route;
