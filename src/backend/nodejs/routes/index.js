
var user = require('./user');
var recommend = require('./recommend');
var config = require ('../config/config');


var express = require('express');

var jwt = require('jsonwebtoken');




const router = express.Router();
router.use('/usr', user);
router.use('/recommend', isLoggedIn(), recommend);


module.exports= router;

// auth
function isLoggedIn () {
  return function(req, res, next) {
    let token = req.cookies.user;
    jwt.verify(token, config.secret, (err) => {
      if (err && err.name === 'TokenExpiredError') {
        return res.status(404).send('Token Expired');
      } else if (err) {
        return res.status(403).send('Need to Login');
      } else {
        return next();
      }
    });
  }
}
