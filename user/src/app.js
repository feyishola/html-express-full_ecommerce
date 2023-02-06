require('./connection/mongo.con')()
const express = require('express')
const app = express()
const cors = require('cors')
const route = require("./route/user.routes")()
const fetch = require('node-fetch')


app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(express.json())
app.use('/api/v1/users', route)   


app.listen(3002, () => {
    console.log("connected to port 3002 user microservice");
})
