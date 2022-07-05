var express = require('express');
var router = express.Router();
var Article = require("../models/article")
var checkSessionAuth = require("../middlewares/checkSessionAuth");

/* GET home page. */
router.get('/', checkSessionAuth, async function (req, res, next) {
  let articles = await Article.find()
  res.render("articles/list", { articles });
});

// THIS ROUTE WILL TAKE US TO THE ARTICLE ADD PAGE
router.get('/add', async function (req, res, next) {
  res.render("articles/add");
});

// AFTER ADDING ARTICLE THIS ROUTE WILL TAKE BACK US TO ADMIN PAGE
// AND STORE DATA IN DB BY post method
router.post('/add', async function (req, res, next) {
  let article = new Article(req.body)
  await article.save()
  res.redirect("/articles");
});

// THIS ROUTE WILL DELETE THE ARTICLE AND REDIRECT TO THE ARTICLES PAGE
router.get('/delete/:id', async function (req, res, next) {
  let article = await Article.findByIdAndDelete(req.params.id)
  res.redirect("/articles")
});

// THIS ROUTE WILL REDIRECT US TO THE EDIT PAGE
router.get('/edit/:id', async function (req, res, next) {
  let article = await Article.findById(req.params.id)
  res.render("articles/edit", { article })
});
//THIS ROUTE WILL EDIT THE ARTICLE AND REDIRECT TO THE ARTICLES PAGE
router.post('/edit/:id', async function (req, res, next) {
  let article = await Article.findById(req.params.id)
  article.title = req.body.title
  article.text = req.body.text
  await article.save()
  res.redirect("/articles")
});


module.exports = router;
