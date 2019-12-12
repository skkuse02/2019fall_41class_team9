var express = require ('express');
var jwt = require('jsonwebtoken');
var config = require("../config/config");

const router = express.Router();

router.post('/signup', (req, res, next) => {
  var pool = req.app.get('dbPool');
  pool.getConnection((error, connection) => {
    connection.query('SELECT * FROM users WHERE userid=?',[req.body.userid], (err, rows, result) => {
      if (rows == '') {
        connection.query('SELECT max(sn) as max FROM users', (err,sn,result) => {
          var njson = { sn: sn[0].max+1 } // assign SN
          console.log(njson.sn);
          
          connection.query('INSERT INTO users SET ?', [Object.assign(njson, req.body)], (err, rows, result) => {
            console.log(njson);
            if (err) {
              connection.release();
              console.log('Query Error - POST signup');
              res.status(500);
              res.json({ message: 'error', result: 'user' });
              throw err;
            }
            connection.release();
            let token = jwt.sign({ userid: req.body.userid }, config.secret, { expiresIn: '4h' });
            res.cookie("user", token);
            res.json({ token: token, message: 'success', result: 'user',sn: njson.sn });
        
          });
       });
      }
      else {
        connection.release();
        console.log('Conflict - POST signup');
        res.status(409);
        res.json({ message: 'conflict', result: 'user' });
      }
    });
  });
});


router.post('/login', (req, res, next) => {
  var pool = req.app.get('dbPool');
  pool.getConnection((error,connection) => {
    connection.query('SELECT sn FROM users where userid = ? and userpw = ?', [req.body.userid, req.body.userpw], (err, rows, result) => {
      console.log(req.body);
      if (err) {
        connection.release();
        console.log('Query Error - POST signup');
        res.status(500).send("Internal Server Error");
        throw err;
      } 
      
      if (rows == '') {
        console.log("Not Found - POST login");
        res.json({ message: 'fail' });
      }
      else {
        let token = jwt.sign({ userid: req.body.userid }, config.secret, { expiresIn: '4h' });
        res.cookie("user", token);
        res.json({ token: token , sn : rows[0].sn, message: 'success' });
      }
      connection.release();
    });
  });
});

router.post('/logout', (req, res) => {
  res.clearCookie("user");
  res.json({ message: 'success', result: 'user' });
});

module.exports = router;