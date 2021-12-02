const mongoose = require('mongoose');
const express = require('express')
const dotenv = require('dotenv')
const app = express()
const port = 5000

dotenv.config()
app.use(express.json())

require('./db/conn')
// const User = require('./model/userSchema')
// link to the router files to make our route easy
app.use(require('./router/auth'))

// console.log(DB)



//middelware
const middleware = (req,res,next) => {
  console.log("hallo my middleware")
  next()
} 
// middleware()

app.get('/', (req, res) => {
  res.send('Hello world i ma a app.js')
})

app.get('/about',middleware,(req, res) => {
  console.log("hallo my about")
  res.send('Hello world about!')
})
app.get('/contact', (req, res) => {
  
  res.send('Hello world about contact!')
})
app.get('signing', (req, res) => {
  res.send('Hello world signing!')
})
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})