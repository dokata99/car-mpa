const Car = require('../model/cars')
const Brands = require('../model/brands')
const Models = require('../model/models')
const Regions = require('../model/regions')


async function getAll() {
    let cars = await Car.find({}).sort({ _id: -1 }).populate('brand').populate('model').populate('owner').populate('region').lean()

    //TODO: pagination

    return cars
}

async function getMatchingCars(query) {
    const { searchBrand, searchModel, searchRegion } = query;
    let filterQuery = {};
    if (searchBrand && searchBrand !== "all") {
        let brand = await Brands.findOne({ brand: searchBrand }).lean()

        filterQuery.brand = brand._id;
    }
    if (searchModel) {
        let models = await Models.find({ model: searchModel }).lean()
        let modelIds = [];
        models.forEach((model) => {
            modelIds.push(model._id.toString())
        });

        filterQuery.model = { $in: modelIds };
    }
    if (searchRegion) {
        let regions = await Regions.find({ region: searchRegion }).lean()
        let regionIds = [];
        regions.forEach((region) => {
            regionIds.push(region._id.toString())
        })

        filterQuery.region = { $in: regionIds };
    }

    let cars = await Car.find(filterQuery).sort({ _id: -1 }).populate('brand').populate('model').populate('owner').populate('region').lean()

    //TODO: pagination

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
    getMatchingCars,
    getById,
    check,
    getBrandName,
    getModelName,
    editCar
}