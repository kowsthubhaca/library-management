var express = require('express');
var app = express();
var pool = require('../database/users/librarian.js');


app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }))

app.post("/login", (req, res) => {

    var librarian = {
        user_id: req.body.username,
        password: req.body.password
    }
    const query = 'Select Exists(SELECT login_id FROM AUTHENTICATION WHERE login_id=$1 and password=$2);'
    newTemp = librarian.password.toString().replace(/"/g, "'");
    const data = [parseInt(librarian.user_id), newTemp];
    pool.query(query, data).then( results=> {
        if(results.rows[0].exists){
            if(parseInt(librarian.user_id)>999){
                res.cookie('type','S',{maxAge:3000000});
                res.redirect("/");
            }
            else{
                res.cookie('type','A',{maxAge:3000000});
                res.redirect("/");
            }
        }
        else{
            console.log("Incorrect Password")
            res.render("login",{incorrect:true});
        }
    }).catch(error => { 
        console.log(error)
    });

});

module.exports = app;