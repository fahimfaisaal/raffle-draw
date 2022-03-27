const router = require('express').Router()

const loginHandler = require('../middleware/loginHandler')
const loginController = require('../controllers/loginController')

router.get('/login', loginHandler, loginController)

module.exports = router