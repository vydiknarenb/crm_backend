//Components Imports
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

//Calling env variable
require('dotenv/config');

//Middleware
app.use(express.json());
app.use(cors());

//Importing User Routes
const userRoute = require('./controllers/user_controller');
const serviceRoute = require('./controllers/service_controller');
app.use('/api/user', userRoute);
app.use('/api/service', serviceRoute);


//ROUTES
app.get('/', (req, res) => {
    res.send("home");
})


//DB Connection // To connect to local database replace the .env with  DB_CONNECTION=mongodb://localhost/crm_backend
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once("open", () => { console.log('Successfully Connected to Database!')});

//Listen
app.listen(3000);