var express = require('express');
var router = express.Router();
const models = require('../models');

//const setupAuth = require('./auth');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Chilangos' });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'stuff here for github' });
});

router.get('/home', function(req, res, next) {

  models.Question.findAll()
  .then(questions => {
    res.render('home', {
      phrase: questions[1].phrase,
      id: questions[1].id,
      answer1: questions[1].option_1,
      answer2: questions[1].option_2,
      answer3: questions[1].option_3,
      answer4: questions[1].correct_answer,
      score: "0" //ToDo: Return actual score
    });
  });
});

router.post('/home', function(req, res, next) {

  // For testing
  console.log(req.body.question_id);
  console.log(req.body.answer);

  // Just for testing too
  res.render('home', {
    phrase: "--",
    answer1: "--",
    answer2: "--",
    answer3: "--",
    answer4: "--",
    score: "0",
    answerStatus: "Correct!"
  });

});

module.exports = router;
