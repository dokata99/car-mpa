const User = require('../model/user')


function getUser(userId) {

    return User.findById(userId).lean()

}

function uploadPhoto(userId, profileImg) {

    return User.findByIdAndUpdate({ _id: userId }, {profileImg: profileImg})

}

module.exports = {
    getUser,
    uploadPhoto
}