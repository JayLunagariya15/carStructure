const express = require('express');
const Router = express.Router();
const userController = require('../controllers/userController');
const brandController = require('../controllers/brandController');
const carController = require('../controllers/carController');

Router.post('/userCreate', userController.newData);

Router.post('/compCreate', brandController.newComp);

// Router.post('/carCreate', carController.carDetail);
// Router.get('/getAll', carController.getCar); 
Router.post('/carAdd', carController.carData);
Router.get('/get', carController.getDetail);


module.exports = Router;