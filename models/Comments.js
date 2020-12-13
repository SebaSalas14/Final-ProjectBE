const { Schema, model} = require ('mongoose');
const mongoose = require('mongoose');

const commentsSchema = Schema({
    name: {
        type: String,
        required : true, 
        trim: true
    },
    body :{
        type: String,
        required: true,
        trim: true
    },
    email : {
        type: String,
        unique: true,
        required: true,
        trim:true
    }
})

module.exports = mongoose.model('Comments', commentsSchema);