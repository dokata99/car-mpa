const { Router } = require('express')
const router = Router()
const addService = require('../services/addService')


router.get('/', (req, res) => {
    addService.getBrands()
        .then((brands) => {
            addService.getRegions()
                .then((regions) => {
                    res.render('add', { title: 'CarsExpress', brands, regions })
                })
        })
        .catch(() => res.statusMessage(404).end())
})
router.post('/', (req, res) => {

    //TODO VALIDATION

    //console.log(req.body)
    //res.redirect('/')
    addService.create(req.body.brand, req.body.model, req.body.region, req.body, req.user._id)
        .then(() => {
            res.redirect('/')
        }).catch((error) => console.log(error))

})

router.get('/brand', (req, res) => {

    res.render('brand', { title: 'CarsExpress' })

})

router.post('/brand', (req, res) => {

    addService.createBrand(req.body)
        .then(() => {
            res.redirect('/add')
        }).catch(() => res.status(500).end())

})

router.get('/model', (req, res) => {

    addService.getBrands()
        .then((brands) => {
            res.render('model', { title: 'CarsExpress', brands })
        })
        .catch(() => res.statusMessage(404).end())

})

router.post('/model', (req, res) => {

    addService.createModel(req.body.model, req.body.brand)
        .then(() => {
            res.redirect('/add')
        }).catch(() => res.status(500).end())

})

router.get('/region', (req, res) => {

    res.render('region', { title: 'CarsExpress' })

})

router.post('/region', (req, res) => {

    addService.createRegion(req.body)
        .then(() => {
            res.redirect('/add')
        }).catch(() => res.status(500).end())

})

router.get('/:brandName', (req, res) => {
    let func = addService.getModelsByBrand(req.params.brandName)
        .then((models) => {
            res.json(models);
        })
})

module.exports = router