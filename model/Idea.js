const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;

const ideaSchema = new Schema({
    idea:
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

module.exports = mongoose.model("Idea", ideaSchema)