var express = require('express');
var app = express();
var pool = require('../database/users/librarian.js');


app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }))

app.post("/issue", (req, res) => {
    
    let user_id = req.body.id;
    let borrowed_book_id = req.body.book_id
    let date = new Date(Date.now()).toISOString().substring(0, 10)
    let someDate = new Date(date)
    someDate.setDate(someDate.getDate() + 15);
    var returnDate = someDate.toISOString().substr(0, 10);
    pool.query('Begin;').then(results => {
        pool.query('insert into borrowed_by (issue_date,return_date,borrowed_book_id,borrowed_member_id) SELECT a::DATE,b::DATE,c::integer,d::integer FROM (values($1,$2,$3,$4)) s(a,b,c,d)  where (select not exists(select * from borrowed_by where return_status=false and borrowed_book_id=$3::integer))=true ;', [date, returnDate, borrowed_book_id, user_id]).then(results => {
            if(results.rowCount==1){
                pool.query('end transaction;').then(results => {
                    console.log("Book issued")
                    res.redirect('/thankyou')
                }).catch(error => {
                    console.log(error)
                });
            }
            else{
                pool.query('end transaction;').then(results => {
                    console.log("unable to add")
                    res.redirect('/issue')
                }).catch(error => {
                    console.log(error)
                });
            }
        }).catch(error => {
            console.log(error)
        });
    }).catch(error => {
        console.log(error)
    });
});

module.exports = app;


