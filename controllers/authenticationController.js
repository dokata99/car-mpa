const { Router } = require('express')
const router = Router()
const authService = require('../services/authenticationService')
const isAuth= require('../middlewares/isAuth')
const isGuest= require('../middlewares/isGuest')



router.get('/register', isGuest, (req, res) => {

    res.render('register', { title: 'CarsExpress' })

})

router.post('/register', isGuest, async (req, res) => {
    const { email, username, phone, password, rePassword } = req.body

    if (password !== rePassword) {
        return res.render('register', { title: 'Register', error: 'The password does not match!' })
    }

    if (username.length <= 3) {
        return res.render('register', { title: 'Register', error: 'Username should be more than 3 symbols!' })
    }

    if (password.length <= 3) {
        return res.render('register', { title: 'Register', error: 'Password should be more than 3 symbols!' })
    }

    //VALIDATION TODO


    try {

        let user = await authService.register(req.body)

        console.log("New User Created!")
        console.log(user)

        res.redirect('/auth/login')

    } catch (error) {
        res.render('register', { error, title: 'Register' })
    }

})

router.get('/login', isGuest, (req, res) => {

    res.render('login', { title: 'CarsExpress' })

})

router.post('/login', isGuest, async (req, res) => {

    const { username, password } = req.body

    if(!username){
       return res.render('login', {title: 'CarsExpress', message:'Enter all fields!'})
    }

    if(!password){
       return res.render('login', {title: 'CarsExpress', message:'Enter all fields!'})
    }

    //validation TODO

    try {
        let token = await authService.login(req.body)

        console.log(token)

        res.cookie('USER_SESSION', token)

        res.redirect('/')

    } catch (error) {
        
        console.log(error)
        res.render('login', {title: 'CarsExpress', error})
    }
})

router.get('/logout', isAuth, (req,res) =>{
    res.clearCookie('USER_SESSION')
    res.redirect('/')
})

module.exports = router