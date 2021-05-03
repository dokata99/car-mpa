const { Router } = require('express')
const router = Router() 
const addService = require('../services/addService')


router.get('/',(req,res) => {
    res.render('add',{title: 'CarsExpress'})
})
router.post('/',(req,res) => {
    
    //TODO VALIDATION
  
    addService.create(req.body, req.user._id)
        .then(()=>{
         res.redirect('/')
        }).catch(() => res.status(500).end())
   
})


module.exports = router