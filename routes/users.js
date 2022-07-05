var express = require('express');
var router = express.Router();
var User = require("../models/user")

/* GET users listing. */

//ROUTE FOR REGISTERING NEW USER
router.get('/register', function (req, res, next) {
  res.render('users/register');
});

// ROUTE FOR SUBMITTING CREDENTIALS OF A NEW USER
router.post('/register', async function (req, res, next) {
  let user = new User(req.body)
  await user.save()
  res.redirect('/login');
});

//ROUTE FOR LOGIN USER
router.get('/login', function (req, res, next) {
  res.render('users/login');
});

// ROUTE FOR SUBMITTING CREDENTIALS OF A LOGIN USER AND REDIRECT TO THE HOME PAGE
router.post("/login", async function (req, res, next) {
  let user = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });
  if (!user) return res.redirect("/login");//IF NOT
  req.session.user = user;//IF YES
  return res.redirect("/");
});

// ROUTE FOR LOGOUT EXISTING USER
router.get('/logout', function (req, res, next) {
  req.session.user = null
  res.redirect('/login');
});

module.exports = router;
