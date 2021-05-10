const { Router } = require('express')
const router = Router()
const homeController = require('./controllers/homeController')
const addController = require('./controllers/addController')
const authenticationController = require('./controllers/authenticationController')
const profileController = require('./controllers/profileController')




router.use('/', homeController) //everything what starts with '/' goes to homeCont.
router.use('/add', addController) // everything what starts with '/add' goes to addCont.
router.use('/profile', profileController)
router.use('/auth', authenticationController) //everything what starts with '/auth' goes to authCont.



module.exports = router