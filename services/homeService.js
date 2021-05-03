const Car = require('../model/car')


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

module.exports= {
    getAll,
    getById,
    check
}