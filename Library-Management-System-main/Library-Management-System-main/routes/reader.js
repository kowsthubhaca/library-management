var express = require('express');
var app = express();

app.set('view engine', 'ejs');

app.get('/reader', (req, res)=>{
    res.render('reader');
});

module.exports = app;