const checkAge = (req, res, next) => {
  if (!req.query.age) return res.redirect('/')
  return next()
}

module.exports = {
  checkAge: checkAge
}
