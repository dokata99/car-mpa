const express = require('express')
const handlebars = require('express-handlebars')
const routes = require('./routes')
const mongoose = require('./config/mongoose') //mongoose configuration
const cookieParser = require('cookie-parser')
const mainMiddleware = require('./middlewares/mainMiddleware')

//here we import NMP packages


const app = express()

mongoose(app)

//set up the view engine for express
app.engine('hbs', handlebars({
    extname: 'hbs'  //default is 'handlebars', we change it to 'hbs' (file extention)
}))
app.set('view engine', 'hbs')

app.use(express.static('public')) //give express permissiton to always use this static folder

app.use(express.urlencoded({   //parce the url to json/doc format 
    extended: true}
    ))

app.use(cookieParser())

app.use(mainMiddleware())

app.use(routes) 



app.listen(5001, () => console.log(`Server is running on port 5001...`)) //set up the port and information log