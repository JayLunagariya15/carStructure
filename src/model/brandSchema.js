const mongoose = require('mongoose');

const companySchema = mongoose.Schema({

    brandname :{
        type: String,
        required: true
    },

    cars: [{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'car'
    }],

    origin :{
        type : String
    }

},{timestamps: true});

const brand = mongoose.model('brand', companySchema);

module.exports = brand