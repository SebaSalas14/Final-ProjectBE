//Importar dos funciones de moongoose
const { Schema, model} = require ('mongoose');
const mongoose = require('mongoose');

const usersSchema = Schema({
    name: {
        type: String,
        required : true, 
        trim: true
    },
    createdAt :{
        type: Date, 
        default: Date.now()
    },
    password : {
        type: String,
        required: true
    },
    email : {
        type: String,
        unique: true,
        required: true,
        trim:true
    },
    favs : {
      type: []
    },
    subscription : {
        type: String,
        trim: true,
        enum:["Free","Gold","Diamond"]
    }
})

module.exports = mongoose.model('Users', usersSchema);