const { Router } = require('express')
const router = Router() 
const authController = require('../services/authenticationService')


router.get('/register',(req,res) =>{

    res.render('register', {title: 'CarsExpress'})
    
})

router.post('/register', async(req,res) =>{
    const {email, username, phone, password, rePassword} = req.body
    if(password !== rePassword){
        return res.render('register', {title: 'Register', error: 'The password does not match!'})
    }

    if(username.length <= 3){
        return res.render('register', {title: 'Register', error: 'Username should be more than 3 symbols!'})
    }

    if(password.length <=3){
        return res.render('register', {title: 'Register', error: 'Password should be more than 3 symbols!'})
    }

    //VALIDATION TODO


    try{

        let user = await authController.register(req.body)
    
        console.log("New User Created!")
        console.log(user)
    
        res.redirect('/auth/login')
        
    }catch(error){
        res.render('register', {error, title: 'Register'})
    }
})

router.get('/login', (req,res) =>{

    res.render('login', {title: 'CarsExpress'})

})

module.exports = router