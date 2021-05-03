const mongoose = require('mongoose')

const carSchema = new mongoose.Schema({
    brand:{
        type: String,
        required: true,
        min:2,
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
        ref: 'User'
    }
})

module.exports = mongoose.model('Cars', carSchema)