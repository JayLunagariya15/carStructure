const express = require('express');
const Router = express.Router();
const userController = require('../controllers/userController');
const brandController = require('../controllers/brandController');
const carController = require('../controllers/carController');

Router.post('/userCreate', userController.newData);
Router.post('/updateoneuser', userController.updateoneuser);
Router.post('/updatemanyuser', userController.updatemanyuser);
Router.post('/deleteoneuser',userController.deleteoneuser);
Router.get('/modify', userController.modify);

Router.post('/compCreate', brandController.newComp);
Router.post('/findbyId', brandController.useID);


Router.post('/carAdd', carController.carData);
Router.get('/', carController.getDetail); // get all 
Router.post('/getOnedata', carController.getData) // query
Router.post('/match', carController.match);


module.exports = Router;