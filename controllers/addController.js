const { Router } = require('express')
const router = Router()
const addService = require('../services/addService')


router.get('/', (req, res) => {

    addService.getBrands()
        .then((brands) => {
            res.render('add', { title: 'CarsExpress', brands })
        })
})
router.post('/', (req, res) => {

    //TODO VALIDATION

    //console.log(req.body)
    //res.redirect('/')
    addService.create(req.body.brand, req.body, req.user._id)
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




module.exports = router