const database = require('../database')
const errorGenerator = require('../utils/errorGenerator')

const loginHandler = (req, _, next) => {
  const { name, id } = req.body;

  const user = database.getUser(id)
  
  if (user?.name !== name) {
    const error = errorGenerator('Invalid user info', 406)
    return next(error)
  }

  req.body = user
  next()
}

module.exports = loginHandler