const mongoose = require('mongoose')

const modelsSchema = new mongoose.Schema({
    model: {
        type: String,
        required: true
    },
    brand: {
        type: mongoose.Types.ObjectId,
        ref: 'Brands',
        required: true,
    }
})

module.exports = mongoose.model('Models', modelsSchema)