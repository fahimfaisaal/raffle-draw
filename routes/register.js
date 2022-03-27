const router = require('express').Router()

const registerHandler = require('../middleware/registerHandler')
const registerController = require('../controllers/registerController')

router.post('/register', registerHandler, registerController)

module.exports = router