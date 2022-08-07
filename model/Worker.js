const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstname:
    {
        type: String,
        required: false
    },
    lastname:
    {
        type: String,
        required: false
    },
    role:
    {
        type: String,
        required: false
    },
    seniority:
    {
        type: Number,
        required: false
    },
    email:{
        type: String,
        required: false
    },
    userId:{
        type: String,
        required: false
    },
 
  
   
})

module.exports = mongoose.model("Worker", userSchema)