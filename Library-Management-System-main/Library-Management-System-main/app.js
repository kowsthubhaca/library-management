var express = require('express');
var app = express();

var issue_func = require('./routes/issue');
var home_func = require('./routes/home');
var return_func = require('./routes/return');
var return_post = require('./routes/return_book');
var login_func = require('./routes/login');
var logout_func = require('./routes/logout');
var login_post = require('./routes/login_post');
var reader_func = require('./routes/reader');
var reader_post = require('./routes/reader_book');
var books_func = require('./routes/books');
var books_del = require('./routes/books_delete');
var signup_func = require('./routes/signup');
var signup_post = require('./routes/signup_post');
var fine_func = require('./routes/fine');
var fine_post = require('./routes/fine_post');
var thankyou_func = require('./routes/thankyou');
var issue_post = require('./routes/issue_book');
var member_func = require('./routes/member');
var book_crud = require('./routes/books_get');
var book_crud_post = require('./routes/books_post'); 

app.use(express.static(__dirname+'/routes'));
app.set('view engine', 'ejs');
app.use(express.urlencoded( {extended: true} ))

app.get('/', home_func);
app.get('/login', login_func);
app.get('/signup', signup_func);
app.post("/signup",signup_post);
app.get('/issue', issue_func);
app.post('/issue', issue_post);
app.get('/books',books_func);
app.post('/books',books_del);
app.get('/add_book',book_crud);
app.post('/add_book',book_crud_post);
app.get('/fine',fine_func);
app.post('/fine',fine_post);
app.get('/reader', reader_func);
app.post('/reader', reader_post);
app.get('/return', return_func);
app.post('/return', return_post);
app.get('/thankyou', thankyou_func);
app.get('/member', member_func);
app.get('/logout', logout_func);
app.post('/login',login_post);
app.use(function (req, res, next) {
    res.status(404).render("404.ejs")
})

var server = app.listen(4000, function() {
    console.log('listening to port 4000')
    console.log('http://localhost:4000/login')
});

// IF EXISTS (SELECT * FROM Borrowed_by WHERE book_id = 1 AND return_status = false) THEN INSERT INTO Borrowed_by (Firstname, Surname, BillingAddress, email) VALUES ('John', 'Smith', '6 Brewery close,Buxtnb    on, Norfolk', 'cmp.testing@example.com');