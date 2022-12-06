var express = require('express');
var app = express();
var pool = require('../database/users/librarian.js');


app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }))


app.post("/books", (req, res) => {

    book_id= req.body.id;
    pool.query('delete from books where book_id=$1;', [book_id]).then(results => {
        if(results.rowCount==1){    
           console.log("deleted")
            res.redirect("/books")
        }
        else{
            console.log("Not found")
            res.cookie("","")
            res.redirect("/books")
        }
    }).catch(error => {
        console.log(error)
    });
});

module.exports = app;
