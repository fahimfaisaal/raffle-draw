const tagWrapper = require('../utils/tagWrapper')
const errorGenerator = require('../utils/errorGenerator')

const notFoundMiddleware = (_req, _res, next) => {
    const error = errorGenerator('404 Page Not Found', 404)

    next(error)
}

const errorHandler = (error, _req, res, _next) => {
    if (error.status) {
        return res.status(error.status).send({ error: error.message })
    }

    res.status(500).send({ error: error.message })
}

module.exports = [
    notFoundMiddleware,
    errorHandler
]