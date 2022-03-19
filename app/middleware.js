const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

module.exports = [
    morgan('dev'),
    cors(),
    express.json()
]