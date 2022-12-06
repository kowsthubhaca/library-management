var express = require('express');
var app = express();
var pool = require('../database/users/librarian.js');

// engine.put("out", System.out);
app.set('view engine', 'ejs');

app.post("/signup", (req, res) => {
    var newuser = {
        user_id: req.body.name,
        password: req.body.password,
        user_type: req.body.type
    };
    if (req.body.type == "Scholar") {
        pool.query('SELECT MAX(LOGIN_ID) FROM AUTHENTICATION;').then( results=> {
            max = results.rows[0].max
            if (max < 1000) {
                max = 999
            }
            max++;
            pool.query('INSERT INTO Authentication values ($1, $2)', [max, newuser.password]).then( results=> {
                pool.query('INSERT INTO Scholar values ($1, \'2099-12-31\',$2,$1)', [max, newuser.user_id]).then( results=> {
                    console.log("User Created")
                    res.cookie("new" , max,{maxAge : 3000});  
                    res.redirect('/login')
                }).catch(error => { 
                    console.log(error)
                });
            }).catch(error => { 
                console.log(error)
            }); 
        }).catch(error => { 
            console.log(error)
        });
    }
    else{
        pool.query('SELECT MAX(LOGIN_ID) FROM AUTHENTICATION where login_id<1000;').then( results=> {
            max = results.rows[0].max + 1;
            pool.query('INSERT INTO Authentication values ($1, $2)', [max, newuser.password]).then( results=> {
                console.log("Admin Created")
                    res.cookie("new" , max,{maxAge : 3000});  
                    // res.cookie("Your Admin User ID" , max, {expire : new Date() + 1});
                res.redirect('/login')
            }).catch(error => { 
                console.log(error)
            }); 
        }).catch(error => { 
            console.log(error)
        });
    }
});

module.exports = app;