var morgan =require('morgan');
var mysql  = require('mysql');
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require ('cookie-parser');
var api = require('./routes')
var config = require('./config/config');
var path = require('path');

var app = express();
app.use(express.json()); // for parsing
app.use(express.static(path.join(__dirname,'./public')));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(morgan('dev'));
app.use('/api', api);


var dbconfig = {
    host : '127.0.0.1',
    user : 'root',
    password : 'Whgusdn1',
    port : 3306,
    database : 'userdb',
    connectionLimit : 50
};

var pool = mysql.createPool(dbconfig);


pool.getConnection(function(err,connection){
  if(!err) {
    console.log("Database is connected ... \n");
  }
  
  else {
    console.log(err);
    console.log("Error connecting Database .. \n");
  }
  
  connection.release();
});

pool.on('acquire', function (connection) {
  console.log('DB Connection %d acquired', connection.threadId)
})
pool.on('release', function (connection) {
  console.log('DB Connection %d released', connection.threadId);
});

app.set('dbPool', pool);

// catch thrown error
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status).json({
    error: err.message,
    code: -1
  });
});

app.listen(7897, function () {
  console.log('App server listening on port 7897!');
});