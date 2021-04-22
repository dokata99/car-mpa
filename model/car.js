const mongoose = require('mongoose')

const carSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        min:2,
    },
    description:{
        type: String, 
        required: true,
    },
    imageUrl:{
        type: String,
        required: true,
        validate: /^https?/
    },
    price:{
        type: Number,
        required:true
    }
})

module.exports = mongoose.model('Cars', carSchema)