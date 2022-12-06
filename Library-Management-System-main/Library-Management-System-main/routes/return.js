var express = require('express');
var app = express();

app.set('view engine', 'ejs');

app.get('/return', (req, res)=>{
    res.render('return');
});

module.exports = app;