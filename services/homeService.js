const Car = require('../model/car')
const Brands = require('../model/brands')


async function getAll(){
    let cars = await Car.find({}).lean()
    
    return cars
}

function getById(id){
    return Car.findById(id).lean()
}

async function check(userId, carId) {

    let car = await Car.findById(carId)
    if (userId == car.owner._id) {
        return true
    }

    return false
}

function getBrandName(brandId){
    return Brands.findById(brandId).lean()
}

module.exports= {
    getAll,
    getById,
    check,
    getBrandName
}