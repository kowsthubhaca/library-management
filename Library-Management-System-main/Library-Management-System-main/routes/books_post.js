var express = require('express');
var app = express();
var pool = require('../database/users/librarian.js');


app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }))

app.post("/add_book", (req, res) => {
    genre = req.body.genre
    edition = req.body.edition
    cost = req.body.cost
    title = req.body.title
    pub_name = req.body.pub_name
    pub_phone = req.body.pub_phone
    pub_addr = req.body.pub_addr
    auth_name = req.body.auth_name
    auth_addr = req.body.auth_addr
    auth_phone = req.body.auth_phone
    var p_id;
    var a_id;
    var b_id;
    pool.query('SELECT * FROM Publisher where p_phone=$1 ;', [pub_phone]).then(results => {
        if (results.rows.length == 1) {
            console.log("exists")
            p_id = results.rows[0].p_id;
            pool.query('SELECT MAX(book_id) FROM books;').then(results => {
                max = results.rows[0].max
                max++;
                b_id = max
                pool.query('INSERT INTO books values ($1, $2, $3, $4, $5, $6)', [max, title, edition, genre, cost, p_id]).then(results => {
                    console.log("Book added")
                    pool.query('SELECT * FROM Author where a_phone=$1 ;', [auth_phone]).then(results => {
                        if (results.rows.length == 1) {
                            a_id = results.rows[0].a_id;
                            console.log("exists")
                            pool.query('INSERT INTO contacts values ($1, $2)', [p_id,a_id]).then(results => {
                                console.log("contacts added")
                                pool.query('INSERT INTO writes values ($1, $2)', [b_id, a_id]).then(results => {
                                    console.log("writes added")
                                    res.redirect("/")
                                }).catch(error => {
                                    console.log(error)
                                });
                            }).catch(error => {
                                console.log(error)
                            });
                
                        }
                        else {
                            pool.query('SELECT MAX(a_id) FROM author;').then(results => {
                                max = results.rows[0].max
                                max++;
                                a_id = max;
                                pool.query('INSERT INTO author values ($1, $2, $3, $4)', [max, auth_name, auth_addr, auth_phone]).then(results => {
                                    console.log("Author added")
                                    pool.query('INSERT INTO contacts values ($1, $2)', [p_id,a_id]).then(results => {
                                        console.log("contacts added")
                                        pool.query('INSERT INTO writes values ($1, $2)', [b_id, a_id]).then(results => {
                                            console.log("writes added")
                                            res.redirect("/")
                                        }).catch(error => {
                                            console.log(error)
                                        });
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
        else {
            pool.query('SELECT MAX(p_id) FROM Publisher;').then(results => {
                max = results.rows[0].max
                max++;
                p_id = max;
                pool.query('INSERT INTO publisher values ($1, $2, $3, $4)', [max, pub_name, pub_addr, pub_phone]).then(results => {
                    console.log("Publisher added")
                    pool.query('SELECT MAX(book_id) FROM books;').then(results => {
                        max = results.rows[0].max
                        max++;
                        b_id = max
                        pool.query('INSERT INTO books values ($1, $2, $3, $4, $5, $6)', [max, title, edition,genre, cost, p_id]).then(results => {
                            console.log("Book added")
                            pool.query('SELECT * FROM Author where a_phone=$1 ;', [auth_phone]).then(results => {
                                if (results.rows.length == 1) {
                                    a_id = results.rows[0].a_id;
                                    console.log("exists")
                                    pool.query('INSERT INTO contacts values ($1, $2)', [p_id,a_id]).then(results => {
                                        console.log("contacts added")
                                        pool.query('INSERT INTO writes values ($1, $2)', [b_id, a_id]).then(results => {
                                            console.log("writes added")
                                            res.redirect("/")
                                        }).catch(error => {
                                            console.log(error)
                                        });
                                    }).catch(error => {
                                        console.log(error)
                                    });
                        
                                }
                                else {
                                    pool.query('SELECT MAX(a_id) FROM author;').then(results => {
                                        max = results.rows[0].max
                                        max++;
                                        a_id = max;
                                        pool.query('INSERT INTO author values ($1, $2, $3, $4)', [max, auth_name, auth_addr, auth_phone]).then(results => {
                                            console.log("Author added")
                                            pool.query('INSERT INTO contacts values ($1, $2)', [p_id,a_id]).then(results => {
                                                console.log("contacts added")
                                                pool.query('INSERT INTO writes values ($1, $2)', [b_id, a_id]).then(results => {
                                                    console.log("writes added")
                                                    res.redirect("/")
                                                }).catch(error => {
                                                    console.log(error)
                                                });
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
                            }).catch(error => {
                                console.log(error)
                            });
                        
                        }).catch(error => {
                            console.log(error)
                        });
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
    }).catch(error => {
        console.log(error)
    });

    


    
    

});

module.exports = app;