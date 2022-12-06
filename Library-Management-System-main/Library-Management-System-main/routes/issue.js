var express = require('express');
var app = express();

app.set('view engine', 'ejs');

app.get('/issue', (req, res)=>{
    res.render('issue');
});

module.exports = app;