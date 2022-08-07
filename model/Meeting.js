const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;

const meetingSchema = new Schema({
    place:
    {
        type: String,
        required: false
    },
    date:
    {
        type: String,
        required: false
    },
    time:
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

module.exports = mongoose.model("Meeting", meetingSchema)