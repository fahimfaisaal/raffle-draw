const database = require('../database')
const errorGenerator = require('../utils/errorGenerator')

const registerHandler = (req, _, next) => {
  const { name } = req.body;

  try {
    const user = database.setUser(name)
    req.body = user

    next()
  } catch (e) {
    const error = errorGenerator(e.message, 406)
    next(error)
  }
}

module.exports = registerHandler