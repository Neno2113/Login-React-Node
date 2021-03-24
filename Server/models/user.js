'use strict'

const mongoose = require('mongoose');
var Schema  = mongoose.Schema;


var UserSchema = Schema({
    name: String,
    surname: String,
    email: String,
    password: {type: String, select: false}
});


//Eliminar la password de las peticiones
// UserSchema.methods.toJSON = () => {
//     var obj = this.toObject();
//     delete obj.password

//     return obj;
// }



module.exports = mongoose.model('User', UserSchema);
