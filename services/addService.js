const Car = require('../model/car')


function create(carData){
    let car = new Car(carData)

    return car.save()
}

module.exports = {
    create
}