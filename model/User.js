const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;
const current = new Date();
const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
const userSchema = new Schema({
    username:
    {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    roles: {
        user: {
            type: Number,
            default: 2001
        },
        Editor: Number,
        Admin:Number
    },
    password: {
        type:String,
        required:true
    },
    refreshToken: String,
    date: {
        type:String,
       default:date
    },
 
})

module.exports = mongoose.model("User", userSchema)