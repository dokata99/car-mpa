const Car = require('../model/cars')
const Brands = require('../model/brands')
const Regions = require('../model/regions')

async function create(brandName, regionName, carData, userId) {

    let brand = await Brands.findOne({ brand: brandName }).lean()
    let region = await Regions.findOne({ region: regionName }).lean()

    let car = new Car({
        date: Date.now(),
        imageUrl: carData.imageUrl,
        brand: brand._id,
        model: carData.model,
        year: carData.year,
        engine: carData.engine,
        mileage: carData.mileage,
        description: carData.description,
        price: carData.price,
        owner: userId,
        region: region._id
    })

    return car.save()
}

async function getBrands() {
    let brands = await Brands.find({}).lean()

    return brands
}

async function getRegions() {
    let regions = await Regions.find({}).lean()

    return regions
}

function createBrand(brand) {
    let brandName = new Brands(brand)

    return brandName.save()
}

function createRegion(region) {
    let newRegion = new Regions(region)

    return newRegion.save()
}

module.exports = {
    create,
    getBrands,
    getRegions,
    createBrand,
    createRegion
}