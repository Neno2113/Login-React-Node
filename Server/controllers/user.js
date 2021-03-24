'use strict'

var validator = require('validator');
var User = require('../models/user');
var bcrypt = require('bcrypt');
const { use } = require('../routes/user');
const saltRounds = 10;
var jwt = require('../services/jwt');



var controller = {

    create: (req, res) =>{
        var params = req.body;


        try {
            var validate_name = !validator.isEmpty(params.name);
            var validate_surname = !validator.isEmpty(params.surname);
            var validate_email =  !validator.isEmpty(params.email) && validator.isEmail(params.email);
            var validate_password = !validator.isEmpty(params.password);
        } catch (error) {
            return res.status(200).send({
                message: "Faltan datos por enviar"
            })
        }

        if(validate_name && validate_surname && validate_email && validate_password){
            var user = new User();

            user.name = params.name;
            user.surname = params.surname;
            user.email = params.email.toLowerCase();
            User.findOne({email: user.email}, (err, userExist) => {
                if(err){
                    return res.status(500).send({
                        message: "Ocurrio un error"
                    });
                }
                if(!userExist){
                    bcrypt.hash(params.password, saltRounds, (err, hash) =>{
                        user.password = hash;

                        user.save((err, userStored) => {
                            if(err){
                                return res.status(500).send({
                                    message: "Error al guardar los datos"
                                });
                            }

                            if(!userStored){
                                return res.status(400).send({
                                    message: "El usuario no se guardo"
                                });
                            }

                            return res.status(200).send({
                                status: "success",
                                user: userStored
                            })
                        })
                    })
                } else {
                    
                    return res.status(200).send({
                        status: "error",
                        message: "El usuario ya esta registrado"
                    })
                }
            })

        } else {
            return res.status(200).send({
                status: "error",
                message: "Datos enviados invalidos"
            })
        }

    },

    login: (req, res) => {
        let params = req.body;

        try {
            var validate_email = !validator.isEmpty(params.email) && validator.isEmail(params.email);
            var validate_password = !validator.isEmpty(params.password);
        } catch (error) {
            return res.status(400).send({
                status:"Error",
                message: "Error en la validacion de datos"
            })
        }
     

        if(validate_email && validate_password){
            User.findOne({email: params.email.toLowerCase()}).select('+password').exec((err, user) => {
                if(err){
                    return res.status(500).send({
                        status: "error",
                        message: "Ocurrio un error al validar el usuario"
                    })
                }
        
                if(!user){
                    return res.status(200).send({
                        status: "error",
                        message: "Las credenciales no son correctas."
                    })
                }
                
                bcrypt.compare(params.password, user.password, (err, result) => {
                   
                    if(result){

                        if(params.gettoken) {
                            return res.status(200).send({
                                token: jwt.createToken(user)
                            });
                        } else {
                            user.password = undefined;
                            return res.status(200).send({
                                status: "success",
                                user: user
                            })
                        }


                 
                    } else {
                        return res.status(200).send({
                            status: "error",
                            message: "Las credenciales no son correctas."
                        })
                    }
                });

            })  
        } else {
            return res.status(400).send({
                status:"Error",
                message: "Error en la validacion de datos"
            })
        }


    },

    test: (req, res) => {

        return res.status(200).send({
            status: "success",
            message: "Test"

        })
    }


};



module.exports = controller;
