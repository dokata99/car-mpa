const User = require('../model/user')


function getUser(userId){

    return User.findById(userId).lean()

}

module.exports = {
    getUser
}