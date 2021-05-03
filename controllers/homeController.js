const { Router } = require('express')
const router = Router()
const homeService = require('../services/homeService')

router.get('/', (req, res) => {

    
    homeService.getAll()
        .then((cars) => {
            res.render('home', { title: 'carsExpress', cars })
        }).catch(() => res.status(500).end())

})


router.get('/details/:carId', async (req, res) => {
    
    let car = await homeService.getById(req.params.carId)
    res.render('details', { title: 'CarsExpress', car})
})

module.exports = router