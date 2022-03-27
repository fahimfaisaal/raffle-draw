const loginController = (req, res) => {
  const { name, tickets } = req.body

  res.status(200).json({ name, tickets })
}

module.exports = loginController