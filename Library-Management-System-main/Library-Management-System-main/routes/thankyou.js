var express = require('express');
var app = express();

app.set('view engine', 'ejs');

app.get('/thankyou', (req, res)=>{
    res.render('thankyou');
});


module.exports = app;