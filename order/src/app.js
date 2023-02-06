require('./connection/mongo.con')()
const express = require('express')
const app = express()
const cors = require('cors')
const route = require("./route/order.routes")()
// const fetch = require('node-fetch')


app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(express.json())
app.use('/api/v1/order', route)



app.listen(3000, () => {
    console.log("connected to port 3000 order microservice");
})
