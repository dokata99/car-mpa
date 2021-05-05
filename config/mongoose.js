const mongoose = require('mongoose')

module.exports = (app) => {
    mongoose.connect('mongodb://localhost/carExpress', {useNewUrlParser: true, useUnifiedTopology: true})

    const db = mongoose.connection

    mongoose.set('useFindAndModify', false);

    db.on('error', console.log.bind(console, 'connection error:'))
    db.once('open',console.log.bind(console, 'Connected to database!'))
}