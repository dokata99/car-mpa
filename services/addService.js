const Car = require('../model/car')


function create(carData, userId) {
    let car = new Car({ ...carData, owner: userId })

    return car.save()
}

module.exports = {
    create
}