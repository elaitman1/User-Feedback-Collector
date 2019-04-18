const mongoose = require('mongoose')
// const Schema = mongoose.Schema
// destructuring line above to line below
const { Schema } = mongoose

const userSchema = new Schema({
  googleId: String
  //can add in and remove properties whenever we want//no reloading schema needed
  //ex name: String
})
//tells mongoose that this class needs to be created
mongoose.model('users', userSchema)

//
