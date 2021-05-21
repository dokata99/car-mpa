const Cars = require('../model/cars')
const Brands = require('../model/brands')
const Models = require('../model/models')
const Regions = require('../model/regions')

async function getAll() {
    let cars = await Cars.find({}).sort({ _id: -1 }).populate('brand').populate('model').populate('owner').populate('region').lean();
    //TODO: pagination

    return cars
}

async function getMatchingCars(query) {
    const { searchBrand, searchModel, searchRegion, searchEngine, searchYearMin, searchYearMax, searchPriceMin, searchPriceMax, searchMileageMin, searchMileageMax } = query;
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
    if (searchEngine) {
        filterQuery.engine = { $in: searchEngine };
    }
    if (searchYearMin && searchYearMax) {
        filterQuery.year = { $gte: searchYearMin, $lte: searchYearMax };
    }
    if (searchPriceMin && searchPriceMax) {
        filterQuery.price = { $gte: searchPriceMin, $lte: searchPriceMax };
    }
    if (searchMileageMin && searchMileageMax) {
        filterQuery.mileage = { $gte: searchMileageMin, $lte: searchMileageMax };
    }

    let cars = await Cars.find(filterQuery).sort({ _id: -1 }).populate('brand').populate('model').populate('owner').populate('region').lean()

    //TODO: pagination

    return cars
}

async function getEngines() {
    let engines = Cars.schema.path('engine').enumValues

    return engines.map((str, index) => ({ value: str, id: index + 1 }));
}

async function getMinYear() {
    let car = await Cars.findOne({}).sort({ year: 1 }).lean();
    let minYear = car.year;

    return minYear;
}

async function getMaxYear() {
    let car = await Cars.findOne({}).sort({ year: -1 }).lean();
    let maxYear = car.year;

    return maxYear;
}

async function getMinPrice() {
    let car = await Cars.findOne({}).sort({ price: 1 }).lean();
    let minPrice = car.price;

    return minPrice;
}

async function getMaxPrice() {
    let car = await Cars.findOne({}).sort({ price: -1 }).lean();
    let maxPrice = car.price;

    return maxPrice;
}

async function getMinMileage() {
    let car = await Cars.findOne({}).sort({ mileage: 1 }).lean();
    let minMileage = car.mileage;

    return minMileage;
}

async function getMaxMileage() {
    let car = await Cars.findOne({}).sort({ mileage: -1 }).lean();
    let maxMileage = car.mileage;

    return maxMileage;
}

function getById(id) {
    return Cars.findById(id).lean()
}

async function check(userId, carId) {

    let car = await Cars.findById(carId)
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
        return Cars.findOneAndUpdate({ _id: carId }, { imageUrl: updatedData.imageUrl })
    } else if (!updatedData.imageUrl) {
        return Cars.findOneAndUpdate({ _id: carId }, { price: updatedData.price })
    }

    return Cars.findOneAndUpdate({ _id: carId }, { imageUrl: updatedData.imageUrl, price: updatedData.price })

}
function getRegionName(regionId) {
    return Regions.findById(regionId).lean()
}
function deleteCar(carId){
    return Cars.findByIdAndDelete({_id:carId})
}



module.exports = {
    getAll,
    getMatchingCars,
    getEngines,
    getMinYear,
    getMaxYear,
    getMinPrice,
    getMaxPrice,
    getMinMileage,
    getMaxMileage,
    getById,
    check,
    getBrandName,
    getModelName,
    editCar,
    deleteCar,
    getRegionName
}