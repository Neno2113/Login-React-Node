'use strict'


const jwt = require('jwt-simple');
const moment = require('moment');
const clave = "clave-secreta-para-generar-el-token-2113"


var services = {

    createToken: (user) => {
        var payload  = {
            sub: user._id,
            name: user.name,
            surname: user.surname,
            email: user.email,
            iat: moment().unix(), 
            exp: moment().add(30, 'days').unix
        };
    
        return jwt.encode(payload, clave);
    }
}


module.exports = services;

// exports.createToken = (user) => {
    
 

// };
