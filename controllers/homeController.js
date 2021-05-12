const { Router } = require('express')
const router = Router()
const homeService = require('../services/homeService')
const profileService = require('../services/profileService')

router.get('/', async(req, res) => {

    homeService.getAll()
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

            res.render('home', { title: 'carsExpress', cars })
        }).catch(() => res.status(500).end())

})


router.get('/details/:carId', async(req, res) => {

    let car = await homeService.getById(req.params.carId)
    let brand = await homeService.getBrandName(car.brand)
    let user = await profileService.getUser(car.owner)
    let isOwner = false
    if (req.user) {
        isOwner = await homeService.check(req.user._id, req.params.carId)
    }
    res.render('details', { title: 'CarsExpress', car, isOwner, user, brand })
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