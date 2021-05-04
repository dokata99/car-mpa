const mongoose = require('mongoose')

const carSchema = new mongoose.Schema({
    brand:{
        type: mongoose.Types.ObjectId,
        ref: 'Brands',
        required: true,
    },
    model:{
        type: String, 
        required: true,
    },
    price:{
        type: Number,
        required:true
    },
    imageUrl:{
        type: String,
        required: true,
        validate: /^https?/
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
    }
})

module.exports = mongoose.model('Cars', carSchema)