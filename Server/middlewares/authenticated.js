'use strict'

const jwt = require('jwt-simple')
const moment = require('moment');
const clave = "clave-secreta-para-generar-el-token-2113"


exports.authenticated = (req, res, next) =>{

    if(!req.headers.authorization){
        return res.status(403).send({
            message: "La peticion no tiene headers de authorizacion"
        });
    }
    //Limpiar el token
    let token = req.headers.authorization.replace(/['"]+/g, '');

    //Decodificar el token 
    try {
        var payload = jwt.decode(token, clave);

        //Comprobar si Token expiro
        if(payload.exp <= moment().unix()){
            return res.status(404).send({
                message: "El token ha expirado"
            });
        }

    } catch (ex) {
        return res.status(404).send({
            message: "El token no es valido"
        });
    }

    req.user = payload;



    next();
};
