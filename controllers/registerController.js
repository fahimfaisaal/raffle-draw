const registerController = (req, res) => {
  const { name, id } = req.body

  res.status(201).json({
    message: `${name} has been created`,
    userId: id,
  })
}

module.exports = registerController