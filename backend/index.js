const products = require('./products')
const express = require('express')
/* const mongoose = require('mongoose') */
const ConnectSchema = require('./dbs')
//ensure to add express router feature later versions
const app = express()
const register=require('./routes/routes')

const cors = require('cors')
require('dotenv').config()
const port = process.env.PORT || 4000

//i will use express.json to parse json data
//configure middleware functions
app.use(express.json())

//allow access of nodejs api from react appobject
app.use(cors())

app.use('/api', register)

//create a get route
app.get('/', (req, res) => {
 res.send("Welcome to our online store API")
})

app.get('/products', async(req, res) => {
    res.send(products);
});

//connect to mongodb
ConnectSchema();

//handling the errors
app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).send("Something went wrong")
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
    })