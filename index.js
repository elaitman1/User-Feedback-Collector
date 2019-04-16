const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send({bye: 'buddy'})
})

const PORT = process.env.PORT || 5000
//if there is an environment var that has already been assigned to heroku, go and assign it by port, otherwise default 5000
app.listen(PORT)
