const { Router } = require('express')
const router = Router() 


router.get('/register',(req,res) =>{

    res.render('register', {title: 'CarsExpress'})
    
})

router.get('/login', (req,res) =>{

    res.render('login', {title: 'CarsExpress'})

})

module.exports = router