require('./connection/mongo.con')()
const express = require('express')
const app = express()
const cors = require('cors')
const route = require("./route/products.routes")()
const fetch = require('node-fetch')


app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(express.json())
app.use('/api/v1/products', route)


app.listen(3001, () => {
    console.log("connected to port 3001 product microservice");
})
