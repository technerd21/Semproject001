function sessionAuth(req, res, next) {
    // SET VARIABLE FOR EVERY PUG FILE
    res.locals.user = req.session.user
    next()
}

module.exports = sessionAuth;