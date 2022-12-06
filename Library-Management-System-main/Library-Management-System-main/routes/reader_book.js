var express = require('express');
var app = express();
var pool = require('../database/users/librarian.js');


app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }))

app.post("/reader", (req, res) => {

    let user_id= req.body.id
    let user_name= req.body.name
    let user_phone= req.body.phone
    let user_address= req.body.address
    let user_book= req.body.book_id
    let date = new Date(Date.now()).toISOString().substring(0, 10)
    // console.log(borrowed_book)
    pool.query('insert into borrowed_by (issue_date,return_date,borrowed_book_id,borrowed_member_id) SELECT a::DATE,b::DATE,c::integer,d::integer FROM (values($1,$2,$3,$4)) s(a,b,c,d)  where (select not exists(select * from borrowed_by where return_status=false and borrowed_book_id=$3::integer))=true ;', [date, date, user_book, user_id]).then(results => {
        pool.query('select exists(select * from reader where r_id=$1);',[user_id]).then(results1 => {
            if(results1.rows[0].exists==true){
                console.log("exist")
                res.redirect('/thankyou')
            }
            else{
                console.log("does not exist")
                pool.query('insert into reader values($1,$2,$3,$4);',[user_id,user_name,user_address,user_phone]).then(results => {
                    console.log("Reader added")
                    res.redirect('/thankyou')
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


