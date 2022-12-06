var express = require('express');
var app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }))

app.get('/fine', (req, res)=>{
    res.render('fine');
});

module.exports = app;