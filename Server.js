process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var mongoose = require('./config/mongoose'),

 express = require('./config/express');

var db = mongoose();

var app = express();

app.listen(80);

console.log('server running at http://localhost');

module.exports = app;
