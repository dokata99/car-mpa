const Car = require('../model/car')
const Brands =require('../model/brands')


async function create(brandName,carData, userId) {

    let brandId = await Brands.findOne({brand:brandName}).lean()

    let car = new Car({brand: brandId._id ,model:carData.model,price: carData.price,imageUrl: carData.imageUrl, owner: userId })

    return car.save()
}
async function getBrands(){
    let brands = await Brands.find({}).lean()

    return brands
}

function createBrand(brand){
    let brandName = new Brands(brand)

    return brandName.save()
}
module.exports = {
    create,
    getBrands,
    createBrand
}