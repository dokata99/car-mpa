const { Router } = require('express')
const router = Router() 

router.get('/', (req,res) => {
    
    res.render('home', {title: 'carsExpress', cars })

})


router.get('/details/:carId',(req,res) =>{

    res.render('details', {title: 'CarsExpress'})
})

module.exports = router