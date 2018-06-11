var express = require('express');
var router = express.Router();

//const setupAuth = require('./auth');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Chilangos' });
});
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'stuff here for github' });
});
router.get('/home', function(req, res, next) {
  res.render('home', {phrase:'hasta la madre', //show random question card for authenticated user
                      answer1: "goodbye mommy!",
                      answer2: "your mother!",
                      answer3: "to be fed up!",
                      answer4: "what a mother!",
                      score: 0 });
});
module.exports = router;
