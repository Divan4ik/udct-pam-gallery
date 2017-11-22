let dbConfig = require('../config/db.config.js');
const mysql = require('mysql');
const pool = mysql.createPool(dbConfig);
let bodyParser = require('body-parser');

const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;

// for [x-forwarded-for] from nginx
app.set('trust proxy', '127.0.0.1');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = 8000;

require('./routes')(app, pool);

app.listen(process.env.PORT || port);
console.log('listening on port ' + port);