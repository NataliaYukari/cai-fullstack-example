const express = require('express')
const cors = require('cors')
const session = require('express-session');
const messageRoutes = require('./routes/message')
const userRoutes = require('./routes/user')
const accountRoutes = require('./routes/account')
const mongoose = require('mongoose')
const dotenv = require('dotenv');

dotenv.config({path: './.env'});
const uri = process.env.MONGODB_URI;

module.exports = function setup() {
    //criando o app
    let app = express()

    //configurando o app
    app.use(cors({
        origin: 'http://localhost:3000', // React app's origin
        credentials: true,
    }));
    app.use(express.json())
    app.use(session({
        secret: 'segredo-seguro',
        resave: false,
        saveUninitialized: true,
        cookie: { maxAge: 600000 }
    }));

    mongoose.connect(uri)
    .then(()=>{
        console.log("Banco Conectado!")
    }).catch((err)=>{
        console.log(err)
        throw err
    })

    //load app routes    
    app = messageRoutes(app)
    app = userRoutes(app)
    app = accountRoutes(app)
    
    return app
}