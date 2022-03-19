const router = require('express').Router()

router.get('/health', (_, res) => {
    res.status(200).json({ message: "Success" })
})

module.exports = router