var express = require('express');
var router = express.Router();
const models = require('../models');

//const setupAuth = require('./auth');
const shuffleArray = array => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Chilangos' });
});

router.get('/login', function (req, res, next) {
  //res.render('login', { title: 'stuff here for github' });
});

router.get('/home', function (req, res, next) {

  let answerMessage = req.query.answerStatus;
  console.log(answerMessage);

  models.Question.findAll()
    .then(questions => {
      shuffleArray(questions);
      let answers = [questions[1].option_1, questions[1].option_2, questions[1].option_3, questions[1].correct_answer];
      shuffleArray(answers);

      res.render('home', {
        phrase: questions[1].phrase,
        id: questions[1].id,
        answer1: answers[0],
        answer2: answers[1],
        answer3: answers[2],
        answer4: answers[3],
        answerStatus: answerMessage,
        score: "0" //ToDo: Return actual score
      });
    });
});

router.post('/home', function (req, res, next) {

  // For testing
  console.log(req.body.question_id);
  console.log(req.body.answer);

  models.Question.findById(req.body.question_id)
    .then(question => {
      let answerMessage = '';
      if (question.correct_answer == req.body.answer) {
        answerMessage = encodeURIComponent("correct");
      }
      else {
        answerMessage = encodeURIComponent("incorrect");
      }

      res.redirect('home?answerStatus=' + answerMessage);

    });

});

module.exports = router;
