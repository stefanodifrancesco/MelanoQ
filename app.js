const express = require('express');
const session = require('express-session');
const path = require('path');
const bodyParser = require('body-parser');
const routes = require('./routes/routes');


const app = express();

app.use(session({ secret: 'ssshhhhh', saveUninitialized: true, resave: true }));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', routes);

app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;