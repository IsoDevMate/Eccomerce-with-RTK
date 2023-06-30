const express = require('express')

//ensure to add express router feature later versions
const app = require()
//i will use express.json to parse json data
//configure middleware functions
const cors = require('cors')
require('dotenv').config()
const port= process.env.PORT || 4000

app.use=(express.json())

//allow access of nodejs api from react app
app.use(cors())

//create a get route
app.get('/', (req, res) => {
 res.send("Welcome to our online store API")
})
app.get('/products', (req, res) => {
 res.send([1,2,3,5,4])
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
    })