var express = require('express');
var app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }))

app.get("/add_book", (req, res) => {
    res.render("books_add")
});

module.exports = app;