const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;

const todoSchema = new Schema({
    todo:
    {
        type: String,
        required: false
    },
    Completed:
    {
        type: Boolean,
        required: false
    },
    userId:
    {
        type: String,
        required: false  
    }
    
})

module.exports = mongoose.model("Todo", todoSchema)