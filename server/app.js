const express = require('express')
const app = express()
const router = require("./routers")
const cors = require("cors")

app.use(cors())
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(router)

module.exports = app
