const { Schema, model} = require ('mongoose');
const mongoose = require('mongoose');

const coursesSchema = Schema({
    name: {
        type: String,
        required : true, 
        trim: true
    },
    lastModification :{
        type: Date, 
        default: Date.now()
    },
    category : {
        type: String,
        required: true,
    },
    directedBy : {
        type: String,
        required: true,
        trim:true
    },
    description:{
        type:String,
        required:true
    },
    displayed:{
        type:Boolean,
        required:true
    },
    featured:{
        type:Boolean,
        required:true
    },
    subscription:
    {
        type:String,
        required:true,
        enum:["Free","Gold","Diamond"]
    },
    comments:
    {
        type:[],
        required:true,
    },
 image:{
     type: String,
     require:true,
     },

})

module.exports = mongoose.model('Courses', coursesSchema);