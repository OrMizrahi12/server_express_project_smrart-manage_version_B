const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;

const remainderSchema = new Schema({
    remainder:
    {
        type: String,
        required: false
    },
    userId:
    {
        type: String,
        required: false
    },

})

module.exports = mongoose.model("Remainder", remainderSchema)