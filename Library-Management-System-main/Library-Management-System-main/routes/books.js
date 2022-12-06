var express = require('express');
var app = express();
var pool = require('../database/users/librarian.js');

app.set('view engine', 'ejs');

app.get('/books', (req, res)=>{
    if(typeof req.headers.cookie==="undefined"){
        res.redirect('/login')
    }
    else{
      var id = parseInt(req.headers.cookie.substring(3,));
      var pool;
      if(id>999){
        pool = require('../database/users/librarian.js');
      }
      else{
        pool = require('../database/users/scholar.js');
      }
      const displayBooks = (request, response) => {
        pool.query('SELECT * FROM books order by book_id',  (error, results) => {
            if (error) {
              throw error
            }
            names = {
            data : results.rows
            }
            res.render("books",names)
        })
      }
      displayBooks();
    }
});

module.exports = app;