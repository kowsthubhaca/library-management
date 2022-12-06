var express = require('express');
var app = express();
var pool = require('../database/users/librarian.js');


app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }))

app.post("/return", (req, res) => {

    var user_id = req.body.id
    let borrowed_book_id = req.body.book_id
    let date = new Date(Date.now())
    pool.query('Begin;').then(results => {
        pool.query(' SELECT RETURN_DATE,issue_date FROM BORROWED_BY WHERE BORROWED_BOOK_ID=$1 and return_status=false and borrowed_member_id=$2;', [borrowed_book_id,user_id]).then(results => {
            if(results.rows.length==0){
                res.redirect('/return')
            }
            else{
            var return_date = new Date(results.rows[0].return_date)
            var issue_date = results.rows[0].issue_date
            issue_date.setDate(issue_date.getDate() + 1);
            issue_date = issue_date.toISOString().substr(0, 10);
            console.log(issue_date)
            if (return_date - date > 0) {
                pool.query('update borrowed_by set return_status=true where return_status=false and borrowed_book_id=$1 and borrowed_member_id=$2;', [borrowed_book_id,user_id]).then(results => {
                    pool.query('end transaction;').then(results => {
                        // alert("Book Returned")
                        res.redirect('/thankyou')
                    }).catch(error => {
                        console.log(error)
                    });
                }).catch(error => {
                    console.log(error)
                });
            }
            else {
                res.cookie('fine', 5 * parseInt((date - return_date) / (1000 * 60 * 60 * 24), 10), { maxAge: 30000 });
                res.cookie('book', borrowed_book_id, { maxAge: 20000 });
                res.cookie('member', user_id, { maxAge: 20000 });
                res.cookie('issue', issue_date, { maxAge: 20000 });
                alert("Fine Paid")
                res.redirect('/fine')
            }
        }
        }).catch(error => {
            console.log(error)
        });
    }).catch(error => {
        console.log(error)
    });

});

module.exports = app;


