const tagWrapper = require('../utils/tagWrapper')
const errorGenerator = require('../utils/errorGenerator')

const notFoundMiddleware = (_req, _res, next) => {
    const error = errorGenerator('404 Page Not Found', 404)

    next(error)
}

const errorHandler = (error, _req, res, _next) => {
    if (error.status) {
        return res.status(error.status).send(tagWrapper(error.message, 'h1'))
    }

    res.status(500).send(tagWrapper(error.message, 'h1'))
}

module.exports = [
    notFoundMiddleware,
    errorHandler
]