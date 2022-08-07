const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title:
    {
        type: String,
        required: false
    },
    body:
    {
        type: String,
        required: false
    },
    like:
    {
        type: Number ,
        required: false
    },
    unlike:
    {
        type: Number,
        required: false
    },
    userId:
    {
        type: String,
        required: false  
    }
    
})

module.exports = mongoose.model("Post", postSchema)