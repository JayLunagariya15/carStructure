const mongoose = require('mongoose');

const carSchema = mongoose.Schema({

    carname: {
        type : String,
        required: true,
        unique: true
    },

    model: {
        type: String
    },

    type:{
        type: String,
        enum:['Sedan','Sport','Suv','Super','Small']
    },

    price :{
        type: Number,
        required : true 
    }
},{timestamps: true});

const car = mongoose.model('car', carSchema);   
module.exports = car

