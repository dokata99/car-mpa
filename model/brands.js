const mongoose = require('mongoose')

const brandsSchema = new mongoose.Schema({
    brand: {
        required: true,
        type: String
    }
})

module.exports = mongoose.model('Brands', brandsSchema)