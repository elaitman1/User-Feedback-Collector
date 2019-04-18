const passport = require('passport')

module.exports = (app) => {
  app.get('/auth/google', passport.authenticate('google',
      {
        scope: ['profile', 'email']
      })
      //2. scope says to google, give us access to profile and email of users account
    )

  app.get('/auth/google/callback', passport.authenticate('google'));
  //above, supposed to exchange the code for the actual user profile
  //this now sends us to step 5 which is put user on hold take the code from the url, this code fulfills step 4

  app.get('/api/logout', (req, res) => {//logout
    req.logout()//here takes the cookie and kills it
    res.send(req.user)//proves to user that they are no longer signed in. will show undefined
  })

  app.get('/api/current_user', (req, res)=>{//req is incoming request, res is outgoing response
    res.send(req.user)
  })
}
