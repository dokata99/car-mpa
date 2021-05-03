const { Router } = require('express')
const router = Router()
const profileService = require('../services/profileService')

router.get('/:profileId', async(req,res) => {

    let profile = await profileService.getUser(req.params.profileId)
    
    res.render('profile',{title: 'CarsExpress', profile})
})

router.get('/edit/:profileId', async (req, res) => {
    res.render('edit',{title: 'CarsExpress'})
})

router.post('/edit/:profileId', (req,res) => {

    profileService.uploadPhoto(req.params.profileId,req.body.profileImg)
        .then(() =>
            res.redirect(`/profile/${req.user._id}`)
        )
        

})

module.exports = router
