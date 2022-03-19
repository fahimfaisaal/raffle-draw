require('dotenv').config('../.env')
const express = require('express')
const app = express()

app.use(require('./middleware'))
app.use(require('./route'))
app.use(require('./error'))

module.exports = app