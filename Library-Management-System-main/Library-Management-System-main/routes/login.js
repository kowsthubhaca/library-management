var express = require('express');
var app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded( {extended: true} ))

app.get('/login', (req, res)=>{
    res.render('login');
});

module.exports = app;