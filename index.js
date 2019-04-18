// console.developers.google.com
const express = require('express')
const mongoose = require('mongoose')
const cookieSession = require('cookie-session')
const passport = require('passport')
const keys = require('./config/keys')
require('./models/User')
//Schema hasn't been registered for model "users".(this is an error message meaning that models/user has to come before services/passport)
require('./services/passport')


mongoose.connect(keys.mongoURI)

const app = express()
//app.use is middleware that is used to modify requests before they are sent to route handlers
//used one time and is used for every request that is coming into application
//
app.use(
  
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,//how long cookie can exist inside browser before it is automatically expired...must be passed in miliseconds so... 30 days 24 hours in a day 60 minutes in an hour 60 seconds in an hour 1000 miliseconds to 1 second
    keys: [keys.cookieKey] //taken from keys file
  })
)
app.use(passport.initialize())
app.use(passport.session())

require('./routes/authRoutes')(app)
//require statement calls authroutes which returns the app function with argument app

const PORT = process.env.PORT || 5000
//if there is an environment var that has already been assigned to heroku, go and assign it by port, otherwise default 5000
app.listen(PORT)

/////////////////////////////////////////////////
