var express = require('express');
var router = express.Router();
var Article = require("../models/article")
var checkSessionAuth = require("../middlewares/checkSessionAuth");

/* GET home page. */
router.get('/', async function (req, res, next) {
  let articles = await Article.find()
  res.render('index', { title: 'Bloggers.pk', articles });
});

// readmore
router.get('/readmore/:id', async function (req, res, next) {
  let article = await Article.findById(req.params.id)
  res.render("articles/readmore", { article });
  // res.redirect("/")
});


// ROUTE FOR ADDDING ARTICLE IN FOURITIES
router.get('/favorities', checkSessionAuth, function (req, res, next) {
  let favorities = req.cookies.favorities
  if (!favorities) favorities = []
  res.render('favorities', { favorities });
});

// THIS ROUTE WILL ADD TO FAVOUITIES THE ARTICLE AND REDIRECT TO THE HOME PAGE
router.get('/favorities/:id', checkSessionAuth, async function (req, res, next) {
  let article = await Article.findById(req.params.id)
  let favorities = []
  if (req.cookies.favorities) favorities = req.cookies.favorities
  favorities.push(article)
  res.cookie("favorities", favorities)
  res.redirect("/")
});

// THIS ROUTE WILL REMOVE THE ARTICLE FROM THE FAOURITIES
router.get('/favorities/remove/:id', async function (req, res, next) {
  let favorities = []
  if (req.cookies.favorities) favorities = req.cookies.favorities
  favorities.splice(favorities.findIndex(f => f._id == req.params.id), 1)
  res.cookie("favorities", favorities)
  res.redirect("/favorities")
});


module.exports = router;
