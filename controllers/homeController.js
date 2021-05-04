const { Router } = require('express')
const router = Router()
const homeService = require('../services/homeService')
const profileService = require('../services/profileService')

router.get('/', (req, res) => {

    
    homeService.getAll()
        .then((cars) => {
            res.render('home', { title: 'carsExpress', cars })
        }).catch(() => res.status(500).end())

})


router.get('/details/:carId', async (req, res) => {
    
    let car = await homeService.getById(req.params.carId)
    let brand = await homeService.getBrandName(car.brand)
    let user= await profileService.getUser(car.owner)
    let isOwner = false
    if(req.user){
        isOwner = await homeService.check(req.user._id, req.params.carId)
    }
    res.render('details', { title: 'CarsExpress', car, isOwner, user, brand})

})

module.exports = router