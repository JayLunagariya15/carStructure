const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    
    username :{
        type: String,
        required : true,
        unique: true
    },

    company :[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'brand'
    }],

    phone: {
        type: Number,
        required:true
    },

    cars:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'car'
    }],
},{timestamps: true});

const user = mongoose.model('user', userSchema);
module.exports = user