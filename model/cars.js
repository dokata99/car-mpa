const mongoose = require('mongoose')

const carSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
        validate: /^https?/
    },
    brand: {
        type: mongoose.Types.ObjectId,
        ref: 'Brands',
        required: true,
    },
    model: {
        type: mongoose.Types.ObjectId,
        ref: 'Models',
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    engine: {
        type: String,
        enum: ['Дизел', 'Бензин', 'Газ', 'Хибрид', 'Електрически'],
        default: ['Бензин'],
    },
    mileage: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: false
    },
    price: {
        type: Number,
        required: true
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'Users',
        required: true,
    },
    region: {
        type: mongoose.Types.ObjectId,
        ref: 'Regions',
        required: true,
    }
})

module.exports = mongoose.model('Cars', carSchema)