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

let shuffledQuestions;
let answers;
let score = 0;
let previousQuestion;
let remainQuestions;

router.get('/home', function(req, res, next) {

  models.Question.findAll()
  .then(questions => {
    shuffleArray(questions);
    shuffledQuestions = questions;
    answers = [questions[0].option_1, questions[0].option_2, questions[0].option_3, questions[0].correct_answer];
    shuffleArray(answers);

    res.render('home', {
      phrase: questions[0].phrase,
      literal_translation: questions[0].literal_translation,
      answer1: answers[0],
      answer2: answers[1],
      answer3: answers[2],
      answer4: answers[3],
      score: score 
    });
  });
});

router.post('/home', function(req, res, next) {
  
  previousQuestion = shuffledQuestions.shift();
  if(shuffledQuestions.length == 0){
    if(req.body.answer == previousQuestion.correct_answer){score += 1;}
    res.render('endGame', {
      answerStatus: "End of questions!",
      score: score
    });
    score = 0;
  }
  if(req.body.answer == previousQuestion.correct_answer){
    score += 1;
    answerStatus= "Correct!";
}
else {answerStatus= "Incorrect"}

  shuffleArray(shuffledQuestions);
  answers = [shuffledQuestions[0].option_1, shuffledQuestions[0].option_2, shuffledQuestions[0].option_3, shuffledQuestions[0].correct_answer];
  shuffleArray(answers);
  
  res.render('home', {
    phrase: shuffledQuestions[0].phrase,
    literal_translation: shuffledQuestions[0].literal_translation,
      answer1: answers[0],
      answer2: answers[1],
      answer3: answers[2],
      answer4: answers[3],
      score: score, 
      answerStatus: answerStatus
      
  });

});

module.exports = router;
