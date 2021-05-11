const User = require('../model/users')


function getUser(userId) {

    return User.findById(userId).lean()

}

function uploadPhoto(userId, profileImg) {

    return User.findOneAndUpdate({ _id: userId }, { profileImg: profileImg })

}

module.exports = {
    getUser,
    uploadPhoto
}