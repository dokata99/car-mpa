const User = require('../model/user')
const bcrypt = require('bcrypt')


const register = async (userData) => {

    const { email, username, phone, password } = userData //destruct the object 

    let salt = await bcrypt.genSalt(10) //generate salt(salt is a number. Bigger number generates harder password)
    let hash = await bcrypt.hash(password, salt) // give the password and the number(salt) we hash the password


    const user = new User({ username, password: hash, email, phone })

    return await user.save()
}

const login = async (userData) =>{
 
    //TODO LOGIN 
}


module.exports = {
    register,
    login
}