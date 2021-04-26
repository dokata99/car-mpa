const Car = require('../model/car')


async function getAll(){
    let cars = await Car.find({}).lean()
    
    return cars
}

function getById(id){
    return Car.findById(id).lean()
}

module.exports= {
    getAll,
    getById
}