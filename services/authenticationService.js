const User = require('../model/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const register = async (userData) => {

    const { email, username, phone, password } = userData //destruct the object 

    let salt = await bcrypt.genSalt(10) //generate salt(salt is a number. Bigger number generates harder password)
    let hash = await bcrypt.hash(password, salt) // give the password and the number(salt) we hash the password
    console.log(hash)

    const user = new User({ username, password: hash, email, phone })

    return user.save()

}

const login = async (userData) => {

    const { username, password } = userData


    let user = await User.findOne({ username }).lean()

    if (!user) throw { error: 'User not found!' }
    
    let passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) throw { error: 'Wrond password!' }
    
    let token = jwt.sign({_id: user._id, username}, 'SHUUUUUU')

    return token

}


module.exports = {
    register,
    login
}