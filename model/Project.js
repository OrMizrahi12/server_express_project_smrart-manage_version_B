const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;

const projectSchema = new Schema({
    projectName:
    {
        type: String,
        required: false
    },
    workers:
    {
        type: Array,
        required: false,
        name:String,
        id:String
    },
    projectExplain:
    {
        type: String,
        required: false
    },
    projectBudget:
    {
        type: Number,
        required: false
    },
    endDate:{
        type: String,
        required: false
    },
    equipment:{
        type: Array,
        required: false,

        equipmentName:String,
        price:Number,
        id: String

    },
    idManager: {
        type:String,
        require:false
    },
    correctBudget: {
        type:Number,
        require:false
    }
 
  
   
})

module.exports = mongoose.model("Project", projectSchema)