var express = require('express');
var app = express();
var pool = require('../database/users/librarian.js');
var cookieParser = require('cookie-parser')

app.use(cookieParser())
app.set('view engine', 'ejs');

app.post('/fine', (req, res)=>{
        pool.query('insert into fine values ($1, $2, $3, $4) ;', [req.cookies.book,req.cookies.member,req.cookies.fine,req.cookies.issue]).then(results => {
            pool.query('update borrowed_by set return_status=true where return_status=false and borrowed_book_id=$1;', [req.cookies.book]).then(results => {
                console.log("fine collected")
                res.redirect('/thankyou')
            
        }).catch(error => {
            console.log(error)
        });
        
    }).catch(error => {
        console.log(error)
    });
});

module.exports = app;