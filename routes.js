const { Router } = require('express')
const router = Router() 


router.get('/',(req,res) =>{
    res.render('home', {title: 'CarsExpress'})
})
router.get('/add',(req,res) =>{
    res.render('create', {title: 'CarsExpress'})
})
router.get('/details/:carId',(req,res) =>{
    res.render('details', {title: 'CarsExpress'})
})


module.exports = router