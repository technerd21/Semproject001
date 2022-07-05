var mongoose = require('mongoose')

var articleSchema = mongoose.Schema({
    title: String,
    text: String
})

const Article = mongoose.model("Article", articleSchema)
module.exports = Article