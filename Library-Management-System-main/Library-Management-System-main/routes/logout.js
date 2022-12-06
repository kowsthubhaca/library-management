var express = require('express');
var app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded( {extended: true} ))

app.get('/logout', (req, res)=>{
    res.cookie('type','B' ,{maxAge: 1});
    res.redirect('/login');
});

module.exports = app;