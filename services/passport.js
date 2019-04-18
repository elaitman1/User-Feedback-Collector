const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
const keys = require('../config/keys')

const User = mongoose.model('users')
//one arg means we are trying to fetch something out of mongoose
// two args means we are trying to load something into mongoose

passport.serializeUser((user, done) => {
  //here we turn user into id
  //the user here is what we just pulled out of database from either the promise finding existing user below or the promist creating new user below
  done(null, user.id)
  //here we use the user.id not profile id which is the second id attached the user in db assigned by mongo not google
  //we are doing this because every user has a mongo id but may not have google id if let s say they signed up with linked in
})

passport.deserializeUser((id, done) =>{
  User.findById(id)
    .then(user => {
      done(null, user)
    })
  //here we turn the id into a mongoose model instance or user
})

passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy: true
    //if request runs through any proxy, just trust it and calculate callback url correctly
  },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({googleId: profile.id})//look through the users collection and find the first record where the google id matches the record id
      //profile id is the google id
      .then((existingUser) => {
        if (existingUser){
          //we already have record with the given profile id
          done(null, existingUser)
        }else{
          //we don't have a user record with this id, make a new record
          //here we create a new instance of a user. we include all of the attributes
          new User({ googleId: profile.id})
          //above creates a new model instance
          .save()//save here saves it to database
          .then(user => done(null, user))
          //above is another model instance but the one we get from the database with changes
        }
      })

      //access token allows us to delete update user information in the future. the first time we get it from google, we store it for future use
      //refresh token allows us to refresh access token which expires after certain amount of time. we can then generate a new access token using the refresh token
      //profile has all of our identifying info
      //access token allows us to save user info in our database
    }
))
//passport.use tells atom hey i want you to be aware of new passport please use
//above we have the key and secret key from google for our app.


//serialize user //log in, looks like you have same google profileid as user123. i need to give you token that says you are user123. call serializeUser with the user to generate identifying piece of info. set cookie. user asks for list of posts in future, sends cookie, take identifying piece of infor from cookie pass into deserializeUser to turn it into a user. Ah user123 welcome back heere are your posts
