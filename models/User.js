//Importar dos funciones de moongoose
const { Schema, model} = require ('mongoose');

const usersSchema = Schema({
    name: {
        type: String,
        required : true
    },
    createdAt :{
        type: Date, default: Date.now
    },
    password : {
        type: String,
        required: true
    },
    email : {
        type: String,
        unique: true,
        required: true
    },
    favs : {
      type: []
    }
  
})

module.exports= mongoose.model('User', usersSchema);