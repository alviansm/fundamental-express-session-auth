var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressHandlebars = require('express-handlebars');
var {engine} = require('express-handlebars');
var session = require('express-session');
var MongoDBStore = require('connect-mongodb-session')(session);
var dbconnect = require('./config/database');

var app = express();

dbconnect.databaseConnection;

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

var store = new MongoDBStore({
    uri: dbconnect.MONGO_URI,
    collection: 'alvian-fesa-session'
})

store.on('error', function(error) {
    console.log(error)
})

app.set('trust proxy', 1);

const oneDay = 1000*60*60*24;
app.use(session({
    secret: 'keyboardcat',
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 1000*60*60*24},
    store: store
}))

app.use('/', indexRouter);
app.use('/user', usersRouter);

app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
})

if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        })
    })
}

app.use(function (err, req, res, next) {
    res.status(err.status || 50);
    res.render('error', {
        message: err.message,
        error: {}
    })
})

module.exports = app;
