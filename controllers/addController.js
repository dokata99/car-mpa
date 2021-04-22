const { Router } = require('express')
const router = Router() 


router.get('/',(req,res) => {
    res.render('add',{title: 'CarsExpress'})
})
router.post('/',(req,res) => {

    res.redirect('/')
})


module.exports = router