var express = require('express');
var app = express();
var pool = require('../database/users/librarian.js');


app.set('view engine', 'ejs');

app.get('/member', (req, res)=>{
    pool.query('SELECT * FROM scholar',  (error, results) => {
        if (error) {
          throw error
        }
        names = {
        data : results.rows
        }
        res.render('member',names);
    })
});

module.exports = app;