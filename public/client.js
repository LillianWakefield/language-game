console.log('Client-side code running');

const tryAgain= document.getElementById('tryAgain');
const nextQuestion = document.getElementById('nextQuestion');

nextQuestion.addEventListener('click', function(e) {
  console.log('continue was clicked');
  fetch('/clicked', {method: 'POST'})
    .then(function(response) {
      if(response.ok) {
        console.log('Click was recorded');
        return;
      }
      throw new Error('Request failed.');
    })
    .catch(function(error) {
      console.log(error);
    });
});

tryAgain.addEventListener('click', function(e) {
    console.log('try again was clicked');
    fetch('/clicked', {method: 'POST'})
    .then(function(response) {
      if(response.ok) {
        console.log('Click was recorded');
        return;
      }
      throw new Error('Request failed.');
    })
    .catch(function(error) {
      console.log(error);
    });
  });

  
