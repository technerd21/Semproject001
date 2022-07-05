function checkSessionAuth(req, res, next) {
    // SET VARIABLE FOR EVERY PUG FILE
    if (req.session.user) next()
    else return res.redirect("/login")
}

module.exports = checkSessionAuth;