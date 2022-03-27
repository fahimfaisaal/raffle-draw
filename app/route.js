const router = require('express').Router()
const registerRouter = require('../routes/register')
const loginRouter = require('../routes/login')

/**
 * TODO: GET -> Ticket by id
 * TODO: DELETE -> Ticket by id
 * TODO: PATCH -> Ticket by id
 * TODO: GET -> DRAW
 */
router.use([
    registerRouter,
    loginRouter
])

router.get('/health', (_, res) => {
    res.status(200).json({ message: "Success" })
})

router.get('/', (_, res) => {
    res.status(200).json({ message: 'Welcome to Raffle Draw' })
})

module.exports = router