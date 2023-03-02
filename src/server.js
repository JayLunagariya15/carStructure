const  express =  require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
const {Connection} = require('./config/db');
const Router = require('./router/router')

require("dotenv").config();

const PORT = 3000 || 8080 

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Router 
app.use('/', Router);

//listening
app.listen(3000, (req, res) => {
    console.log("Server is Listening on " + 3000 + " Port");
});

//Database
const username = process.env.DB_USERNAME
const password = process.env.DB_PASSWORD
Connection(username, password)