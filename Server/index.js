'use strict'

const mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 3999;
var localhost = 'mongodb://localhost:27017/login';
var atlasConnection = "mongodb+srv://anel-1:l3c7xvvs6wj@proyectos.koinw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"


mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;
mongoose.connect(localhost, {useUnifiedTopology: true, useNewUrlParser: true})
    .then(() => {
        console.log('La conexion a la base de datos de mongo se ha realizado correctamente');

        app.listen(port, () => {
            console.log("El servidor esta corriendo correctamente")
        });
    })
    .catch(error => console.log(error));
