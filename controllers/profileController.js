const { Router } = require('express')
const router = Router()
const profileService = require('../services/profileService')

router.get('/:profileId', async(req,res) => {

    let profile = await profileService.getUser(req.params.profileId)
    
    res.render('profile',{title: 'CarsExpress', profile})
})

module.exports = router
