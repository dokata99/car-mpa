const { Router } = require('express')
const router = Router()
const homeService = require('../services/homeService')
const profileService = require('../services/profileService')
const addService = require('../services/addService')

router.get('/', async(req, res) => {
    let brands = await addService.getBrands();
    let regions = await addService.getRegions();
    let engines = await homeService.getEngines();
    let minYear = await homeService.getMinYear();
    let maxYear = await homeService.getMaxYear();
    let minPrice = await homeService.getMinPrice();
    let maxPrice = await homeService.getMaxPrice();
    let minMileage = await homeService.getMinMileage();
    let maxMileage = await homeService.getMaxMileage();

    homeService.getMatchingCars(req.query)
        .then((cars) => {
            cars.forEach(car => {
                var options = {
                    year: "numeric",
                    month: "2-digit",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric"
                };

                car.date = car.date.toLocaleDateString("bg", options)
            });
            res.render('home', { title: 'carsExpress', cars, brands, regions, engines, minYear, maxYear, minPrice, maxPrice, minMileage, maxMileage })
        }).catch(() => res.status(500).end())

})

router.get('/details/:carId', async(req, res) => {

    let car = await homeService.getById(req.params.carId)
    let brand = await homeService.getBrandName(car.brand)
    let model = await homeService.getModelName(car.model)
    let user = await profileService.getUser(car.owner)
    let isOwner = false
    if (req.user) {
        isOwner = await homeService.check(req.user._id, req.params.carId)
    }
    res.render('details', { title: 'CarsExpress', car, isOwner, user, brand, model })
})

router.get('/edit/:carId', async(req, res) => {

    let carId = await req.params.carId


    res.render('editCar', { title: 'CarsExpress', carId })
})

router.post('/edit/:carId', async(req, res) => {

    homeService.editCar(req.params.carId, req.body)
        .then(() =>
            res.redirect(`/details/${req.params.carId}`)
        )

})

module.exports = router