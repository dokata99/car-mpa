const Car = require('../model/cars')
const Brands = require('../model/brands')
const Models = require('../model/models')


async function getAll() {
    let cars = await Car.find({}).populate('brand').populate('model').populate('owner').populate('region').lean()

    return cars
}

function getById(id) {
    return Car.findById(id).lean()
}

async function check(userId, carId) {

    let car = await Car.findById(carId)
    if (userId == car.owner._id) {
        return true
    }

    return false
}

function getBrandName(brandId) {
    return Brands.findById(brandId).lean()
}

function getModelName(modelId) {
    return Models.findById(modelId).lean()
}

function editCar(carId, updatedData) {


    if (!updatedData.price) {
        return Car.findOneAndUpdate({ _id: carId }, { imageUrl: updatedData.imageUrl })
    } else if (!updatedData.imageUrl) {
        return Car.findOneAndUpdate({ _id: carId }, { price: updatedData.price })
    }

    return Car.findOneAndUpdate({ _id: carId }, { imageUrl: updatedData.imageUrl, price: updatedData.price })


}


module.exports = {
    getAll,
    getById,
    check,
    getBrandName,
    getModelName,
    editCar
}