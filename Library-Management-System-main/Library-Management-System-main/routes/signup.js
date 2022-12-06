var express = require('express');
var app = express();

app.set('view engine', 'ejs');

app.get('/signup', (req, res)=>{
    res.render('signup');
});

module.exports = app;