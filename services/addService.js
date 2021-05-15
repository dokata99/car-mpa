const Car = require('../model/cars')
const Brands = require('../model/brands')
const Models = require('../model/models')
const Regions = require('../model/regions')

async function create(brandName, modelName, regionName, carData, userId) {

    let brand = await Brands.findOne({ brand: brandName }).lean()
    let region = await Regions.findOne({ region: regionName }).lean()
    let model = await Models.findOne({ model: modelName }).lean()

    let car = new Car({
        date: Date.now(),
        imageUrl: carData.imageUrl,
        brand: brand._id,
        model: model._id,
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
    let brands = await Brands.find({}).sort({ brand: 1 }).lean()

    return brands
}

async function getRegions() {
    let regions = await Regions.find({}).sort({ region: 1 }).lean()

    return regions
}

async function getModelsByBrand(brandName) {
    let brand = await Brands.findOne({ brand: brandName })
    let models = await Models.find({ brand: brand._id }).lean()

    return models;
}

function createBrand(brand) {
    let newBrand = new Brands(brand)

    return newBrand.save()
}

async function createModel(modelName, brandName) {
    let brand = await Brands.findOne({ brand: brandName })
    let newModel = new Models({ model: modelName, brand: brand._id })

    return newModel.save()
}

function createRegion(region) {
    let newRegion = new Regions(region)

    return newRegion.save()
}

module.exports = {
    create,
    getBrands,
    getRegions,
    getModelsByBrand,
    createBrand,
    createModel,
    createRegion
}